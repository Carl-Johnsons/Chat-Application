package com.example.chatapplication.utils;

import android.net.Uri;

import com.example.chatapplication.BuildConfig;

public class UriUtility {
    public static String transformToAndroidUri(String uri) {
        return uri.replace("localhost", BuildConfig.HOST);
    }

    public static Uri transformToAndroidUri(Uri uri) {
        String uriStr = uri.toString();
        return Uri.parse(uriStr.replace("localhost", BuildConfig.HOST));
    }
}
