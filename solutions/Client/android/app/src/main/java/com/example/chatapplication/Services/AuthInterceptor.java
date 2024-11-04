package com.example.chatapplication.Services;

import android.content.Context;

import androidx.annotation.NonNull;

import com.example.chatapplication.auth.AuthStateManager;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

public class AuthInterceptor implements Interceptor {

    private final AuthStateManager authStateManager;

    public AuthInterceptor(Context context) {
        authStateManager = AuthStateManager.getInstance(context);
    }

    @NonNull
    @Override
    public Response intercept(Chain chain) throws IOException {

        Request originalRequest = chain.request();

        String token = authStateManager.getAccessToken();

        Request.Builder builder = originalRequest.newBuilder()
                .header("Authorization", "Bearer " + token)
                .header("Accept", "application/json");

        Request newRequest = builder.build();
        return chain.proceed(newRequest);
    }
}
