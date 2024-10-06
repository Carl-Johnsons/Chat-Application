package com.example.chatapplication.utils;

import android.annotation.SuppressLint;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateLibs {
    public static String FormatDate(String format, Date date){
        @SuppressLint("SimpleDateFormat") SimpleDateFormat sdf = new SimpleDateFormat(format);
        return  sdf.format(date);
    }
}
