package com.example.chatapplication.utils;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import java.io.File;

public class FileUtil {
    public static File uriToFile(Uri uri, Context context) {
        if (uri == null) {
            return null;
        }

        String filePath = null;

        Cursor cursor = context.getContentResolver().query(uri, null, null, null, null);
        if (cursor != null) {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            filePath = cursor.getString(column_index);
            cursor.close();
        }
        return filePath != null ? new File(filePath) : null;
    }
}
