package com.hari.SpringBootRivo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticationResponce {

    @JsonProperty("Access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("message")
    private String message;


    public AuthenticationResponce(String accessToken, String refreshToken, String message) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.message = message;
    }


    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getMessage() {
        return message;
    }
}