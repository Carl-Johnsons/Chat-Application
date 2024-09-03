package com.example.chatapplication;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.chatapplication.utils.UriUtility;

import net.openid.appauth.AppAuthConfiguration;
import net.openid.appauth.AuthorizationException;
import net.openid.appauth.AuthorizationRequest;
import net.openid.appauth.AuthorizationResponse;
import net.openid.appauth.AuthorizationService;
import net.openid.appauth.AuthorizationServiceConfiguration;
import net.openid.appauth.ResponseTypeValues;
import net.openid.appauth.connectivity.ConnectionBuilder;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class SignInActivity extends AppCompatActivity {
    private final String TAG = "SignIn";
    private AuthorizationService authService;
    private final String BASE_IDENTITY_URI = "http://localhost:" + BuildConfig.IDENTITY_SERVICE_PORT;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        authService = new AuthorizationService(this, new AppAuthConfiguration
                .Builder()
                .setConnectionBuilder(new ConnectionBuilder() {
                    @NonNull
                    @Override
                    public HttpURLConnection openConnection(@NonNull Uri uri) throws IOException {
                        URL url = new URL(uri.toString());
                        // Allow both HTTP and HTTPS connections
                        if ("http".equals(url.getProtocol()) || "https".equals(url.getProtocol())) {
                            Log.i(TAG, uri.toString());
                            return (HttpURLConnection) url.openConnection();
                        } else {
                            throw new IOException("Unsupported protocol: " + url.getProtocol());
                        }
                    }
                })
                .build());

        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_sign_in);

        duendeIdentityServerAuth();
        Button btnSignIn = findViewById(R.id.signInBtn);
        btnSignIn.setOnClickListener(v -> duendeIdentityServerAuth());

        System.out.println(BuildConfig.HELLO);


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    private final ActivityResultLauncher<Intent> launcher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(), result -> {
                if (result.getResultCode() != RESULT_OK) {
                    return;
                }
                Intent data = result.getData();
                if (data == null) {
                    Log.e(TAG, "Data is null, authorization may have failed or been canceled.");
                    return;
                }
                AuthorizationException ex = AuthorizationException.fromIntent(data);
                AuthorizationResponse response = AuthorizationResponse.fromIntent(data);

                if (ex != null) {
                    Log.e(TAG, "launcher: " + ex);
                    return;
                }

                if (response == null) {
                    Log.e(TAG, "response is null");
                    return;
                }

                var tokenRequest = response.createTokenExchangeRequest();
                Log.i(TAG, tokenRequest.jsonSerializeString());

                Log.i(TAG, tokenRequest.configuration.toJsonString());
                authService.performTokenRequest(tokenRequest, (res, exception) -> {
                    if (exception != null) {
                        Log.e(TAG, "Token request failed: " + exception.error);
                        Log.e(TAG, exception.toJsonString());
                        Log.e(TAG, "Error details: " + exception.errorDescription);
                        return;
                    }
                    if (res == null) {
                        Log.e(TAG, "Token request response is null.");
                        return;
                    }
                    String token = res.accessToken;
                    if (token == null) {
                        Log.e(TAG, "Token is null.");
                    } else {
                        Log.i(TAG, "Token received: " + token);
                        Intent intent = new Intent(this, MainActivity.class);
                        startActivity(intent);
                        finish();
                    }
                });
            }
    );


    private void duendeIdentityServerAuth() {
        var redrirectUri = Uri.parse("chat-application://oauth2callback");
        var authorizeUri = Uri.parse(UriUtility.transformToAndroidUri(BASE_IDENTITY_URI + "/connect/authorize"));
        var tokenUri = Uri.parse(UriUtility.transformToAndroidUri(BASE_IDENTITY_URI + "/connect/token"));

        var config = new AuthorizationServiceConfiguration(authorizeUri, tokenUri);
        var request = new AuthorizationRequest
                .Builder(config, BuildConfig.ANDROID_CLIENT_ID, ResponseTypeValues.CODE, redrirectUri)
                .setScope("openid profile phone email IdentityServerApi conversation-api post-api offline_access")
                .build();

        var intent = authService.getAuthorizationRequestIntent(request);
        launcher.launch(intent);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        authService.dispose();
    }
}