package com.example.security;

import com.example.model.Authuser;

import java.util.Map;

public interface Jwtimpl {
    public Map<String, String> generateToken(Authuser user);
}
