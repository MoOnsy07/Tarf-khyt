package online.taraf5eet.app;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

public class PushMessagingService extends FirebaseMessagingService {
    public static final String CHANNEL_ID = "taraf_updates";
    private static final String CHANNEL_NAME = "تحديثات طرف الخيط";
    private static final String SUPABASE_URL = "https://meynspmfkkedhqhffsqk.supabase.co";
    private static final String SUPABASE_KEY = "sb_publishable_uAUBrJE76udggvmbU95DVQ_HYDoyEB9";
    private static final String PREFS = "taraf_android";
    private static final String INSTALL_ID_KEY = "push_install_id";

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        registerToken(getApplicationContext(), token);
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        super.onMessageReceived(message);
        Map<String, String> data = message.getData();
        RemoteMessage.Notification notification = message.getNotification();

        String title = notification != null ? notification.getTitle() : null;
        String body = notification != null ? notification.getBody() : null;
        if (title == null || title.trim().isEmpty()) title = data.get("title");
        if (body == null || body.trim().isEmpty()) body = data.get("body");
        String targetUrl = data.get("url");

        if (title == null || title.trim().isEmpty()) title = "طرف الخيط";
        if (body == null) body = "";
        if (targetUrl == null || !targetUrl.startsWith("https://taraf5eet.online")) {
            targetUrl = "https://taraf5eet.online/?android_app=1";
        }

        showNotification(getApplicationContext(), title, body, targetUrl);
    }

    public static void ensureChannel(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null || manager.getNotificationChannel(CHANNEL_ID) != null) return;
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("قضايا جديدة وتحديثات مهمة من طرف الخيط");
        channel.enableVibration(true);
        manager.createNotificationChannel(channel);
    }

    private static void showNotification(Context context, String title, String body, String targetUrl) {
        ensureChannel(context);
        if (Build.VERSION.SDK_INT >= 33 &&
                context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            return;
        }

        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra("url", targetUrl);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                9001,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Notification.Builder builder = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? new Notification.Builder(context, CHANNEL_ID)
                : new Notification.Builder(context);

        builder.setSmallIcon(R.drawable.ic_launcher)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new Notification.BigTextStyle().bigText(body))
                .setColor(Color.rgb(224, 164, 88))
                .setAutoCancel(true)
                .setContentIntent(pendingIntent);

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            builder.setPriority(Notification.PRIORITY_HIGH)
                    .setDefaults(Notification.DEFAULT_ALL);
        }

        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) manager.notify((int) (System.currentTimeMillis() & 0x7fffffff), builder.build());
    }

    public static void registerToken(Context context, String token) {
        if (token == null || token.trim().length() < 20) return;
        Context appContext = context.getApplicationContext();
        String installId = getInstallId(appContext);

        new Thread(() -> {
            HttpURLConnection connection = null;
            try {
                URL url = new URL(SUPABASE_URL + "/rest/v1/rpc/register_push_token");
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                connection.setDoOutput(true);
                connection.setRequestProperty("apikey", SUPABASE_KEY);
                connection.setRequestProperty("Content-Type", "application/json");

                JSONObject payload = new JSONObject();
                payload.put("p_token", token.trim());
                payload.put("p_install_id", installId);
                payload.put("p_platform", "android");
                payload.put("p_app_version", BuildConfig.VERSION_NAME);

                byte[] bytes = payload.toString().getBytes(StandardCharsets.UTF_8);
                connection.setFixedLengthStreamingMode(bytes.length);
                try (OutputStream out = connection.getOutputStream()) {
                    out.write(bytes);
                }
                connection.getResponseCode();
            } catch (Exception ignored) {
            } finally {
                if (connection != null) connection.disconnect();
            }
        }, "taraf-push-register").start();
    }

    private static String getInstallId(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String id = prefs.getString(INSTALL_ID_KEY, null);
        if (id == null || id.trim().isEmpty()) {
            id = UUID.randomUUID().toString();
            prefs.edit().putString(INSTALL_ID_KEY, id).apply();
        }
        return id;
    }
}
