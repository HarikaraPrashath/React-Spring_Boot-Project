package com.hari.SpringBootRivo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticationResponce {

    @JsonProperty("Access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("message")
    private String message;

    @JsonProperty("username")
    private String username;

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("role")
    private Role role;

    public AuthenticationResponce(String accessToken, String refreshToken, String message, String username, Integer id, Role role) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.message = message;
        this.username = username;
        this.id = id;
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}