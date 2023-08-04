package com.example.k_guard_shop_be.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenUtil {

    private static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    private final String secret = "bNjWIq9nGC";
//    Map<String, Object> claims = new HashMap<>();
//    byte[] secretBytes = Base64.getEncoder().encode(secret.getBytes());
//    SecretKey key = new SecretKeySpec(secretBytes, SignatureAlgorithm.HS512.getJcaName());

    public String generateToken(String username) {

        return Jwts.builder() // phương thức xây dựng 1 chuỗi token mới
    //                .setClaims(new HashMap<>())
                .setSubject(username)// thiết lập phần subject trong JWT
//                .claim("username", username)
//                .claim("role", role)
//                .claim("id", id)
                .setIssuedAt(new Date(System.currentTimeMillis()))// thời gian bắt đầu phát hành token
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))// thiết lập thời gian hết hạn của token là thời gian hiện tại cộng với thời gian ta quy định
                .signWith(SignatureAlgorithm.HS512, secret)// Phương thức này sử dụng thuật toán chữ ký "HS512" để ký JWT với một "secret". "Secret" được sử dụng để mã hóa JWT và đảm bảo tính toàn vẹn của nó.
                .compact();//Phương thức này kết hợp tất cả các thông tin đã được đặt vào JWT và trả về một chuỗi JWT hoàn chỉnh.
    }

    public Claims extractClaims(String token) {
        byte[] secretBytes = Base64.getEncoder().encode(secret.getBytes());
        return Jwts.parser()
                .setSigningKey(new SecretKeySpec(secretBytes, SignatureAlgorithm.HS512.getJcaName()))
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token, JwtUserDetails userDetails) {
        try {
            JwtParser parser = Jwts.parser().setSigningKey(secret);
            Claims claims = parser.parseClaimsJws(token).getBody();

            // Kiểm tra tính hợp lệ của token bằng cách so sánh username trong token với thông tin người dùng được truyền vào
            if (claims.getSubject().equals(userDetails.getUsername())) {
                return true;
            }
        } catch (Exception e) {
            // Xử lý ngoại lệ nếu có
        }

        return false;
    }

}