package com.example.chatapplication.Services;


import android.content.Context;

import com.example.chatapplication.BuildConfig;
import com.example.chatapplication.GsonFactory.DateDeserializer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import okhttp3.Cache;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static Retrofit retrofit;
    private static final String BASE_URL = String.format("http://%s:%s/", Optional.of(BuildConfig.HOST).orElse("10.0.2.2"), Optional.of(BuildConfig.API_GATEWAY_PORT).orElse("5000"));

    public static Retrofit getRetrofitInstance(Context context) {
        if (retrofit == null) {
            OkHttpClient okHttpClient = new OkHttpClient.Builder().cache(new Cache(
                            new File(context.getCacheDir(), "http_cache"), 50L * 1024L * 1024L
                    ))
                    .addInterceptor(new AuthInterceptor(context))
                    .addNetworkInterceptor(new CacheInterceptor())
                    .build();
            Gson gson = new GsonBuilder()
                    //.registerTypeAdapter(Date.class, new DateDeserializer())
                    .create();
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .build();
        }
        return retrofit;
    }

}

