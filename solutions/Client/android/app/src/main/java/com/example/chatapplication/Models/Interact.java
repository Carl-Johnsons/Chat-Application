package com.example.chatapplication.Models;

public class Interact {
    private String id;
    private String value;
    private String code;

    public Interact(String value, String code, String id) {
        this.id = id;
        this.value = value;
        this.code = code;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
