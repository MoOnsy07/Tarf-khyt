const ALLOWED_ORIGINS = new Set([
  'https://taraf5eet.online',
  'https://www.taraf5eet.online',
]);

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

type FcmResult = {
  ok: boolean;
  status: number;
  payload: Record<string, unknown>;
};

function cors(req: Request) {
  const requestedOrigin = req.headers.get('origin') || '';
  const origin = ALLOWED_ORIGINS.has(requestedOrigin)
    ? requestedOrigin
    : 'https://taraf5eet.online';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(req), 'Content-Type': 'application/json' },
  });
}

function base64UrlBytes(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlText(value: string) {
  return base64UrlBytes(new TextEncoder().encode(value));
}

async function importPrivateKey(pem: string) {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');
  const raw = Uint8Array.from(atob(body), (char) => char.charCodeAt(0));
  return crypto.subtle.importKey(
    'pkcs8',
    raw,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

async function firebaseAccessToken(serviceAccount: ServiceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlText(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64UrlText(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const key = await importPrivateKey(serviceAccount.private_key);
  const signature = new Uint8Array(await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned),
  ));
  const assertion = `${unsigned}.${base64UrlBytes(signature)}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    throw new Error(`Google OAuth failed: ${payload.error_description || payload.error || response.status}`);
  }
  return String(payload.access_token);
}

function serviceHeaders(serviceRole: string) {
  return {
    apikey: serviceRole,
    Authorization: `Bearer ${serviceRole}`,
    'Content-Type': 'application/json',
  };
}

async function validAdminSession(token: string, supabaseUrl: string, serviceRole: string) {
  if (!token || token.length < 40 || !supabaseUrl || !serviceRole) return false;
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/admin_session_valid`, {
    method: 'POST',
    headers: serviceHeaders(serviceRole),
    body: JSON.stringify({ p_token: token }),
  });
  if (!response.ok) return false;
  return (await response.json().catch(() => false)) === true;
}

async function fetchEnabledWebTokens(supabaseUrl: string, serviceRole: string) {
  const tokens: string[] = [];
  const pageSize = 1000;

  for (let offset = 0; offset < 10000; offset += pageSize) {
    const url = new URL(`${supabaseUrl}/rest/v1/push_devices`);
    url.searchParams.set('select', 'fcm_token');
    url.searchParams.set('enabled', 'eq.true');
    url.searchParams.set('platform', 'eq.web');
    url.searchParams.set('order', 'id.asc');
    url.searchParams.set('limit', String(pageSize));
    url.searchParams.set('offset', String(offset));

    const response = await fetch(url, { headers: serviceHeaders(serviceRole) });
    if (!response.ok) throw new Error(`Could not read web push devices: ${response.status}`);
    const rows = await response.json().catch(() => []);
    if (!Array.isArray(rows)) break;
    for (const row of rows) {
      const token = String(row && row.fcm_token || '').trim();
      if (token) tokens.push(token);
    }
    if (rows.length < pageSize) break;
  }

  return [...new Set(tokens)];
}

async function sendFcm(
  accessToken: string,
  projectId: string,
  message: Record<string, unknown>,
): Promise<FcmResult> {
  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/messages:send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    },
  );
  const payload = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, payload };
}

function tokenIsInvalid(result: FcmResult) {
  const details = JSON.stringify(result.payload || {}).toLowerCase();
  return details.includes('unregistered')
    || details.includes('registration-token-not-registered')
    || details.includes('not registered');
}

async function disableToken(token: string, supabaseUrl: string, serviceRole: string) {
  const url = new URL(`${supabaseUrl}/rest/v1/push_devices`);
  url.searchParams.set('fcm_token', `eq.${token}`);
  await fetch(url, {
    method: 'PATCH',
    headers: { ...serviceHeaders(serviceRole), Prefer: 'return=minimal' },
    body: JSON.stringify({ enabled: false, last_seen_at: new Date().toISOString() }),
  }).catch(() => null);
}

async function sendWebPushes(
  tokens: string[],
  accessToken: string,
  serviceAccount: ServiceAccount,
  title: string,
  body: string,
  targetUrl: string,
  supabaseUrl: string,
  serviceRole: string,
) {
  let success = 0;
  let failure = 0;
  const invalidTokens: string[] = [];
  const concurrency = 25;

  for (let index = 0; index < tokens.length; index += concurrency) {
    const chunk = tokens.slice(index, index + concurrency);
    const results = await Promise.all(chunk.map(async (token) => {
      const result = await sendFcm(accessToken, serviceAccount.project_id, {
        token,
        notification: { title, body },
        data: { title, body, url: targetUrl },
        webpush: {
          headers: { Urgency: 'high' },
          notification: {
            icon: 'https://taraf5eet.online/icons/icon-192.png',
            badge: 'https://taraf5eet.online/icons/icon-192.png',
          },
          fcm_options: { link: targetUrl },
        },
      });
      return { token, result };
    }));

    for (const item of results) {
      if (item.result.ok) success += 1;
      else {
        failure += 1;
        if (tokenIsInvalid(item.result)) invalidTokens.push(item.token);
        console.error('Web FCM error', item.result.status, item.result.payload);
      }
    }
  }

  await Promise.all(invalidTokens.map((token) => disableToken(token, supabaseUrl, serviceRole)));
  return { success, failure, invalid: invalidTokens.length };
}

async function logCampaign(
  supabaseUrl: string,
  serviceRole: string,
  title: string,
  body: string,
  targetUrl: string,
  firebaseMessageName: string | null,
) {
  await fetch(`${supabaseUrl}/rest/v1/push_campaigns`, {
    method: 'POST',
    headers: { ...serviceHeaders(serviceRole), Prefer: 'return=minimal' },
    body: JSON.stringify({
      title,
      body,
      target_url: targetUrl,
      topic: 'android+web',
      firebase_message_name: firebaseMessageName,
    }),
  }).catch(() => null);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(req) });
  if (req.method !== 'POST') return json(req, { error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

  try {
    const adminToken = (req.headers.get('x-admin-token') || '').trim();
    if (!(await validAdminSession(adminToken, supabaseUrl, serviceRole))) {
      return json(req, { error: 'Unauthorized' }, 401);
    }

    const payload = await req.json().catch(() => ({}));
    const title = String(payload.title || '').trim().slice(0, 80);
    const body = String(payload.body || '').trim().slice(0, 240);
    let targetUrl = String(payload.url || 'https://taraf5eet.online/').trim().slice(0, 500);
    if (!/^https:\/\/(www\.)?taraf5eet\.online(?:\/|$)/i.test(targetUrl)) {
      targetUrl = 'https://taraf5eet.online/';
    }
    if (!title || !body) return json(req, { error: 'Title and body are required' }, 400);

    const rawServiceAccount = Deno.env.get('FIREBASE_SERVICE_ACCOUNT_JSON') || '';
    if (!rawServiceAccount) return json(req, { error: 'Firebase is not configured' }, 503);

    let serviceAccount: ServiceAccount;
    try { serviceAccount = JSON.parse(rawServiceAccount); }
    catch { return json(req, { error: 'Invalid Firebase service account JSON' }, 503); }
    if (serviceAccount.project_id !== 'taraf5eet' || !serviceAccount.client_email || !serviceAccount.private_key) {
      return json(req, { error: 'Incomplete or wrong Firebase service account' }, 503);
    }

    const accessToken = await firebaseAccessToken(serviceAccount);
    const webTokens = await fetchEnabledWebTokens(supabaseUrl, serviceRole);

    const androidResult = await sendFcm(accessToken, serviceAccount.project_id, {
      topic: 'all',
      notification: { title, body },
      data: { title, body, url: targetUrl },
      android: {
        priority: 'HIGH',
        notification: {
          channel_id: 'taraf_updates',
          icon: 'ic_launcher',
          color: '#E0A458',
          sound: 'default',
        },
      },
    });

    if (!androidResult.ok) {
      console.error('Android topic FCM error', androidResult.status, androidResult.payload);
    }

    const web = await sendWebPushes(
      webTokens,
      accessToken,
      serviceAccount,
      title,
      body,
      targetUrl,
      supabaseUrl,
      serviceRole,
    );

    const androidName = androidResult.ok ? String(androidResult.payload.name || '') || null : null;
    if (androidResult.ok || web.success > 0) {
      await logCampaign(supabaseUrl, serviceRole, title, body, targetUrl, androidName);
    }

    if (!androidResult.ok && web.success === 0) {
      return json(req, {
        error: 'Firebase send failed',
        detail: 'No Android or web notification was accepted',
        web_total: webTokens.length,
        web_failure: web.failure,
      }, 502);
    }

    return json(req, {
      ok: true,
      android_sent: androidResult.ok,
      web_total: webTokens.length,
      web_success: web.success,
      web_failure: web.failure,
      invalid_tokens_disabled: web.invalid,
      name: androidName,
    });
  } catch (error) {
    console.error(error);
    return json(req, { error: String((error as Error)?.message || error || 'Unknown error') }, 500);
  }
});
