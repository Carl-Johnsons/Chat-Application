package com.example.chatapplication.Constants;

public enum ConversationType {
    INDIVIDUAL("INDIVIDUAL"),
    GROUP("GROUP");

    private final String value;

    ConversationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
