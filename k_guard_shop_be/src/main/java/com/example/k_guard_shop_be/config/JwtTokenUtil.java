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

    private final String secret = "bNjWIq9nGC";// Chu ky so chi co server moi biet duoc

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY + 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
//        return Jwts.builder() // phương thức xây dựng 1 chuỗi token mới
//                .setSubject(username)// thiết lập phần subject trong JWT
////                .claim("username", username)
////                .claim("role", role)
////                .claim("id", id)
//                .setIssuedAt(new Date(System.currentTimeMillis()))// thời gian bắt đầu phát hành token
//                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))// thiết lập thời gian hết hạn của token là thời gian hiện tại cộng với thời gian ta quy định
//                .signWith(SignatureAlgorithm.HS512, secret)// Phương thức này sử dụng thuật toán chữ ký "HS512" để ký JWT với một "secret". "Secret" được sử dụng để mã hóa JWT và đảm bảo tính toàn vẹn của nó.
//                .compact();//Phương thức này kết hợp tất cả các thông tin đã được đặt vào JWT và trả về một chuỗi JWT hoàn chỉnh.
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
//    public String getUsernameFromToken(String token) {
//        Claims claims = Jwts.parser()//thư viện của JWT giúp giải mã và xác thực token
//                .setSigningKey(secret)//  Đây là phương thức để thiết lập khóa bí mật (secret key) để giải mã token.
//                .parseClaimsJws(token) // Phương thức này sẽ giải mã token được truyền vào (biến token) và kiểm tra tính hợp lệ của token.
//                .getBody();// Phương thức này trả về các thông tin chứa trong phần thân (body) của token dưới dạng đối tượng Claims. Các thông tin này đã được mã hóa bên trong token và có thể được truy xuất thông qua các phương thức của đối tượng Claims.
//        return claims.getSubject();// trả về phần subject trong TOKEN thông qua đối tượng claims
//    }

    public boolean validateToken(String token, JwtUserDetails jwtUserDetails) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token).getBody();
            if (claims.getSubject().equals(jwtUserDetails.getUsername())) {
                return true;
            }
        } catch (Exception e) {

        }
        return false;
    }
}