package com.example.chatapplication;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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

import com.example.chatapplication.auth.AuthStateManager;
import com.example.chatapplication.utils.UriUtility;

import net.openid.appauth.AppAuthConfiguration;
import net.openid.appauth.AuthState;
import net.openid.appauth.AuthorizationException;
import net.openid.appauth.AuthorizationRequest;
import net.openid.appauth.AuthorizationResponse;
import net.openid.appauth.AuthorizationService;
import net.openid.appauth.AuthorizationServiceConfiguration;
import net.openid.appauth.ResponseTypeValues;
import net.openid.appauth.connectivity.ConnectionBuilder;

import org.json.JSONException;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class SignInActivity extends AppCompatActivity {
    private final String TAG = "SignIn";
    private AuthorizationServiceConfiguration authConfig;
    private AuthorizationService authService;
    private AuthStateManager authStateManager;
    private final String BASE_IDENTITY_URI = "http://localhost:" + BuildConfig.IDENTITY_SERVICE_PORT;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        var authorizeUri = Uri.parse(UriUtility.transformToAndroidUri(BASE_IDENTITY_URI + "/connect/authorize"));
        var tokenUri = Uri.parse(UriUtility.transformToAndroidUri(BASE_IDENTITY_URI + "/connect/token"));

        authStateManager = AuthStateManager.getInstance(this);
        authConfig = new AuthorizationServiceConfiguration(authorizeUri, tokenUri);

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


        // Handle sign in
        DuendeIdentityServerAuth();
        Button btnSignIn = findViewById(R.id.signInBtn);
        btnSignIn.setOnClickListener(v -> DuendeIdentityServerAuth());

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
                AuthorizationResponse response = AuthorizationResponse.fromIntent(data);
                AuthorizationException ex = AuthorizationException.fromIntent(data);

                authStateManager.updateAfterAuthorization(response, ex);

                if (ex != null) {
                    Log.e(TAG, "launcher: " + ex);
                    return;
                }

                if (response == null) {
                    Log.e(TAG, "response is null");
                    return;
                }

                var tokenRequest = response.createTokenExchangeRequest();

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
                    authStateManager.updateAccessToken(token);
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

    @NonNull
    private AuthState InitializeAuthState(AuthorizationServiceConfiguration config) {
        SharedPreferences prefs = getSharedPreferences("AuthState", Context.MODE_PRIVATE);
        String stateJson = prefs.getString("state", null);
        Log.i(TAG, "init auth state");
        if (stateJson != null) {
            try {
                return AuthState.jsonDeserialize(stateJson);
            } catch (JSONException ex) {
                Log.e(TAG, "Failed to deserialize authState, ", ex);
            }
        }
        Log.i(TAG, "null");
        return new AuthState(config);
    }


    private void DuendeIdentityServerAuth() {
        var redrirectUri = Uri.parse("chat-application://oauth2callback");
        var request = new AuthorizationRequest
                .Builder(authConfig, BuildConfig.ANDROID_CLIENT_ID, ResponseTypeValues.CODE, redrirectUri)
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