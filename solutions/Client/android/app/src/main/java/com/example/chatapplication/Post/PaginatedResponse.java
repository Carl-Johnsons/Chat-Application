package com.example.chatapplication.Post;

import android.health.connect.datatypes.Metadata;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> paginatedData;

    // Getter và Setter
    public List<T> getPaginatedData() {
        return paginatedData;
    }

    public void setPaginatedData(List<T> paginatedData) {
        this.paginatedData = paginatedData;
    }

}
