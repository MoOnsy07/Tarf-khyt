package online.taraf5eet.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends Activity {
    private static final int FILE_CHOOSER_REQUEST = 4107;
    private static final int NOTIFICATION_PERMISSION_REQUEST = 4108;
    private static final String START_URL = "https://taraf5eet.online/";

    private WebView webView;
    private ValueCallback<Uri[]> fileCallback;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(10, 12, 18));
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUrl(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUrl(Uri.parse(url));
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = filePathCallback;
                try {
                    Intent intent = fileChooserParams.createIntent();
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                    return true;
                } catch (ActivityNotFoundException e) {
                    fileCallback = null;
                    Toast.makeText(MainActivity.this, "مش لاقي تطبيق لاختيار الصورة.", Toast.LENGTH_SHORT).show();
                    return false;
                }
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            String pushUrl = getPushUrl(getIntent());
            webView.loadUrl(pushUrl != null ? pushUrl : getStartUrl());
        }

        initPushNotifications();
    }

    private void initPushNotifications() {
        try {
            FirebaseApp app = FirebaseApp.initializeApp(this);
            if (app == null && FirebaseApp.getApps(this).isEmpty()) return;

            PushMessagingService.ensureChannel(this);

            if (Build.VERSION.SDK_INT >= 33 &&
                    checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, NOTIFICATION_PERMISSION_REQUEST);
            }

            FirebaseMessaging.getInstance().subscribeToTopic("all");
            FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
                if (task.isSuccessful() && task.getResult() != null) {
                    PushMessagingService.registerToken(getApplicationContext(), task.getResult());
                }
            });
        } catch (Throwable ignored) {
            // Firebase is intentionally optional until google-services.json is added.
        }
    }

    private String getPushUrl(Intent intent) {
        if (intent == null) return null;
        String value = intent.getStringExtra("url");
        if (value == null || value.trim().isEmpty()) return null;
        try {
            Uri uri = Uri.parse(value.trim());
            String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
            String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();
            if (!"https".equals(scheme) || !("taraf5eet.online".equals(host) || "www.taraf5eet.online".equals(host))) {
                return null;
            }
            Uri.Builder builder = uri.buildUpon();
            if (uri.getQueryParameter("android_app") == null) builder.appendQueryParameter("android_app", "1");
            if (uri.getQueryParameter("app_version") == null) builder.appendQueryParameter("app_version", BuildConfig.VERSION_NAME);
            uri = builder.build();
            return uri.toString();
        } catch (Exception e) {
            return null;
        }
    }

    private String getStartUrl() {
        return Uri.parse(START_URL).buildUpon()
                .appendQueryParameter("android_app", "1")
                .appendQueryParameter("app_version", BuildConfig.VERSION_NAME)
                .build()
                .toString();
    }

    private boolean handleUrl(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();

        if (("http".equals(scheme) || "https".equals(scheme)) &&
                ("taraf5eet.online".equals(host) || "www.taraf5eet.online".equals(host) || host.endsWith(".supabase.co") || host.endsWith(".google.com") || host.endsWith(".googleusercontent.com"))) {
            return false;
        }

        if ("http".equals(scheme) || "https".equals(scheme) || "mailto".equals(scheme) || "tel".equals(scheme) || "intent".equals(scheme)) {
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, uri));
            } catch (Exception ignored) {
            }
            return true;
        }
        return false;
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        String pushUrl = getPushUrl(intent);
        if (pushUrl != null && webView != null) webView.loadUrl(pushUrl);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        if (webView != null) webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST || fileCallback == null) return;
        Uri[] results = null;
        if (resultCode == RESULT_OK) {
            results = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
        }
        fileCallback.onReceiveValue(results);
        fileCallback = null;
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
