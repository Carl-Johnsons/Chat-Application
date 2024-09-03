package com.example.chatapplication.utils;

import android.net.Uri;

public class UriUtility {
    public static String transformToAndroidUri(String uri) {
        return uri.replace("localhost", "10.0.2.2");
    }

    public static Uri transformToAndroidUri(Uri uri) {
        String uriStr = uri.toString();
        return Uri.parse(uriStr.replace("localhost", "10.0.2.2"));
    }
}
