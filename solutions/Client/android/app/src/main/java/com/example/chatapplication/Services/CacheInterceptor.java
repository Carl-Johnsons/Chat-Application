package com.example.chatapplication.Services;

import okhttp3.CacheControl;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class CacheInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        // Lấy request
        okhttp3.Request request = chain.request();

        // Kiểm tra xem có kết nối mạng không
        if (isNetworkAvailable()) {
            if (request.url().toString().contains("/api/users")) {
                request = buildRequest(request, 60);
            }
            if (request.url().toString().contains("/api/conversation")) {
                request =buildRequest(request, 0);
            }
            if (request.url().toString().contains("/api/message")) {
                request =buildRequest(request, 0);
            }
            System.out.println(request.url());
            System.out.println(request.headers());

        } else {
            // Nếu không có kết nối, yêu cầu sử dụng cache
            request = request.newBuilder()
                    .header("Cache-Control", "public, only-if-cached, max-stale=604800") // Cache tối đa 7 ngày
                    .build();
        }

        // Gửi request

        Response response = chain.proceed(request);
        if (request.url().toString().contains("/api/users")) {
            response = buildResponse(response, 60);
        }
        if (request.url().toString().contains("/api/conversation")) {
            response =buildResponse(response, 0);
        }
        if (request.url().toString().contains("/api/message")) {
            response =buildResponse(response, 0);
        }
        return response;
    }

    // Phương thức kiểm tra kết nối mạng (implement theo cách của bạn)
    private boolean isNetworkAvailable() {
        return true; // Chỉ là ví dụ, bạn cần thay đổi để kiểm tra thực tế
    }

    private  Request buildRequest(Request request, int maxAge){
        CacheControl cacheControl = new CacheControl.Builder()
                .maxAge(maxAge, TimeUnit.SECONDS)
                .build();
        return request.newBuilder()
                .cacheControl(cacheControl)
                .build();
    }

    private  Response buildResponse(Response response, int maxAge){
        CacheControl cacheControl = new CacheControl.Builder()
                .maxAge(maxAge, TimeUnit.SECONDS)
                .build();
        return response.newBuilder()
                .header("Cache-Control", "public, max-age="+maxAge)
                .build();
    }
}
