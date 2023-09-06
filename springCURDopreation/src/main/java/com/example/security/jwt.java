package com.example.security;

import com.example.model.Authuser;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class jwt {
    public Map<String, String> generateToken(Authuser user) {
        String jsonWebToken=null;

        JwtBuilder jwtBuilder= Jwts.builder();
        jsonWebToken=jwtBuilder.setSubject(user.getUserEmail()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256,"secret").compact();
        Map<String,String> tokenMap=new HashMap<String,String>();
        tokenMap.put("token",jsonWebToken);
        tokenMap.put("message","User Successfully LoggedIn");

        return tokenMap;
    }
}
