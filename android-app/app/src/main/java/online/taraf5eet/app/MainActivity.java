package online.taraf5eet.app;

import android.Manifest;
import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.View;
import android.view.animation.OvershootInterpolator;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.core.splashscreen.SplashScreen;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends Activity {
    private static final int FILE_CHOOSER_REQUEST = 4107;
    private static final int NOTIFICATION_PERMISSION_REQUEST = 4108;
    private static final String START_URL = "https://taraf5eet.online/";
    private static final String OFFLINE_URL = "file:///android_asset/offline.html";

    private WebView webView;
    private Vibrator vibrator;
    private ValueCallback<Uri[]> fileCallback;
    private volatile boolean contentReady = false;
    private boolean showingOffline = false;
    private boolean splashDismissed = false;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);

        // Keep the branded splash visible until the game has actually finished
        // loading (or clearly failed), instead of handing off to a blank WebView.
        splashScreen.setKeepOnScreenCondition(() -> !contentReady);
        splashScreen.setOnExitAnimationListener(this::animateSplashExit);

        webView = new WebView(this);
        vibrator = (Vibrator) getSystemService(VIBRATOR_SERVICE);
        webView.setBackgroundColor(Color.rgb(10, 12, 18));
        webView.setAlpha(0f);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.addJavascriptInterface(new NativeBridge(), "NativeBridge");
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

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request.isForMainFrame()) showOfflineScreen();
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (OFFLINE_URL.equals(url)) {
                    contentReady = true;
                    fadeInWebView();
                    return;
                }
                if (!showingOffline) {
                    contentReady = true;
                    fadeInWebView();
                    view.evaluateJavascript(TAP_HAPTIC_JS, null);
                    view.evaluateJavascript(NATIVE_SHARE_JS, null);
                }
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

        // Safety net: never leave the splash on screen forever on a very slow
        // or flaky connection — release it after 6s even if load hasn't fired.
        webView.postDelayed(() -> contentReady = true, 6000);

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

    private void showOfflineScreen() {
        if (showingOffline) return;
        showingOffline = true;
        webView.setAlpha(0f);
        webView.loadUrl(OFFLINE_URL);
    }

    private void retryFromOffline() {
        showingOffline = false;
        webView.setAlpha(0f);
        String pushUrl = getPushUrl(getIntent());
        webView.loadUrl(pushUrl != null ? pushUrl : getStartUrl());
    }

    private void fadeInWebView() {
        if (webView.getAlpha() >= 1f) return;
        webView.animate().alpha(1f).setDuration(220).start();
    }

    private void hapticTick() {
        if (vibrator == null || !vibrator.hasVibrator()) return;
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_TICK));
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(12, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                vibrator.vibrate(12);
            }
        } catch (Exception ignored) {
        }
    }

    private void nativeShare(String dataJson) {
        try {
            org.json.JSONObject data = new org.json.JSONObject(dataJson);
            String title = data.optString("title", "");
            String text = data.optString("text", "");
            String url = data.optString("url", "");
            String combined = (text + (url.isEmpty() ? "" : (text.isEmpty() ? "" : "\n") + url)).trim();

            Intent share = new Intent(Intent.ACTION_SEND);
            share.setType("text/plain");
            if (!title.isEmpty()) share.putExtra(Intent.EXTRA_SUBJECT, title);
            share.putExtra(Intent.EXTRA_TEXT, combined.isEmpty() ? getStartUrl() : combined);
            startActivity(Intent.createChooser(share, "شارك"));
        } catch (Exception ignored) {
        }
    }

    private static final String TAP_HAPTIC_JS =
            "(function(){" +
            "if(window.__hapticBound)return;" +
            "window.__hapticBound=true;" +
            "document.addEventListener('pointerdown',function(e){" +
            "var t=e.target;" +
            "var el=t&&t.closest?t.closest('button,a,[role=button],[onclick],.btn,input[type=button],input[type=submit]'):null;" +
            "if(el&&window.NativeBridge&&window.NativeBridge.haptic){window.NativeBridge.haptic();}" +
            "},true);" +
            "})();";

    private static final String NATIVE_SHARE_JS =
            "(function(){" +
            "if(window.__shareBound)return;" +
            "window.__shareBound=true;" +
            "if(!window.NativeBridge||!window.NativeBridge.share)return;" +
            "navigator.share=function(data){" +
            "try{window.NativeBridge.share(JSON.stringify(data||{}));}catch(e){}" +
            "return Promise.resolve();" +
            "};" +
            "})();";

    private void animateSplashExit(androidx.core.splashscreen.SplashScreenViewProvider provider) {
        if (splashDismissed) {
            provider.remove();
            return;
        }
        splashDismissed = true;
        ObjectAnimator scaleX = ObjectAnimator.ofFloat(provider.getIconView(), View.SCALE_X, 1f, 0.85f, 1.1f, 0f);
        ObjectAnimator scaleY = ObjectAnimator.ofFloat(provider.getIconView(), View.SCALE_Y, 1f, 0.85f, 1.1f, 0f);
        ObjectAnimator alpha = ObjectAnimator.ofFloat(provider.getView(), View.ALPHA, 1f, 0f);
        scaleX.setInterpolator(new OvershootInterpolator());
        scaleY.setInterpolator(new OvershootInterpolator());
        scaleX.setDuration(420);
        scaleY.setDuration(420);
        alpha.setDuration(260);
        alpha.setStartDelay(220);
        alpha.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                provider.remove();
            }
        });
        scaleX.start();
        scaleY.start();
        alpha.start();
    }

    private class NativeBridge {
        @JavascriptInterface
        public void retry() {
            runOnUiThread(MainActivity.this::retryFromOffline);
        }

        @JavascriptInterface
        public void haptic() {
            hapticTick();
        }

        @JavascriptInterface
        public void share(String dataJson) {
            runOnUiThread(() -> nativeShare(dataJson));
        }
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
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            confirmExit();
        }
    }

    private void confirmExit() {
        new AlertDialog.Builder(this)
                .setTitle("تقفل طرف الخيط؟")
                .setMessage("متأكد إنك عايز تخرج من اللعبة دلوقتي؟")
                .setPositiveButton("قفل", (dialog, which) -> {
                    dialog.dismiss();
                    finish();
                })
                .setNegativeButton("لأ، كمّل", (dialog, which) -> dialog.dismiss())
                .setCancelable(true)
                .show();
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
