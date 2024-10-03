package com.example.chatapplication.utils;

import androidx.annotation.NonNull;

import okhttp3.CacheControl;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ApiUtil {
    public static <T> void callApi(Call<T> call, ApiCallback<T> callback) {
        CacheControl cacheControl = new CacheControl.Builder()
                .onlyIfCached() // force to use cache
                .build();
        call.request().newBuilder()
                .cacheControl(cacheControl)
                .build();
        call.enqueue(new Callback<T>() {
            @Override
            public void onResponse(@NonNull Call<T> call, @NonNull Response<T> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onSuccess(response.body());
                } else {
                    callback.onError(new Exception("Request failed with code: " + response.code()));
                }
            }

            @Override
            public void onFailure(@NonNull Call<T> call, @NonNull Throwable t) {
                callback.onError(t);
            }
        });
    }

    public interface ApiCallback<T> {
        void onSuccess(T result);
        void onError(Throwable t);
    }

    public static void callApi(Call<Void> call, StatusCallback callback) {
        CacheControl cacheControl = new CacheControl.Builder()
                .onlyIfCached() // force to use cache
                .build();
        call.request().newBuilder()
                .cacheControl(cacheControl)
                .build();
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {
                    callback.onSuccess();
                } else {
                    callback.onError(new Exception("Request failed with code: " + response.code()));
                }
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onError(t);
            }
        });
    }

    public interface StatusCallback {
        void onSuccess();
        void onError(Throwable t);
    }
}
