package com.example.k_guard_shop_be.controller;


import com.example.k_guard_shop_be.config.JwtTokenUtil;
import com.example.k_guard_shop_be.config.JwtUserDetails;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.Users;
import com.example.k_guard_shop_be.reponse.JwtRequest;
import com.example.k_guard_shop_be.reponse.JwtResponse;
import com.example.k_guard_shop_be.service.EmailService;
import com.example.k_guard_shop_be.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UsersController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UsersService usersService;
//    @Autowired
//    private EmailService emailService;
//


    @PostMapping("/authenticate")
    public ResponseEntity<?> loginAuthentication(@RequestBody JwtRequest authenticationRequest) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication); // lưu đối tượng authenticate đã được xác thực, có các quyền tương ứng
            JwtUserDetails principal = (JwtUserDetails) authentication.getPrincipal();// lấy ra thông điệp đã được xác thực từ authenticate ( thông điệp ở đây là JwtUserDetail chứa username, password và quyền)
            GrantedAuthority authority = principal.getAuthorities().stream().findFirst().orElse(null);// lấy râ quyền từ principal if không có thì null
            final String token = jwtTokenUtil.generateToken(principal.getUsername());//gọi jwtTokenUtil vầ truyền vào username để chuyển generate ra token.

            return ResponseEntity.ok(new JwtResponse(token, principal.getUsername(), authority != null ? authority.getAuthority() : null));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đăng nhập thất bại");
        }
//        Users users = usersService.findByUsername(authenticationRequest.getUsername());
//        final UserDetails userDetails = usersService.loadUserByUsername(authenticationRequest.getUsername());
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<?> checkMail(@RequestBody Customer customer) {
//        Customer customer = usersService.findByEmail(customer.getEmail());
        if (customer != null) {
//            Random random = new Random();
//            int randomNumber = random.nextInt(900000) + 100000;
//            users.setVerificationCode(randomNumber);
//            try {
//                usersService.editUser(users);
//                emailService.sendMail(users.getEmail(), "Mã xác nhận email", "Chào bạn,Mã xác thực email trong quy trình lấy lại mật khẩu của bạn:" + randomNumber +
//                        "\n" +
//                        "\n" +
//                        "\n" +
//                        "\n" +
//                        "---------------------------------------" + "\n" +
//                        "Name :Pawn Shop\n" +
//                        "Mobile : 0782391943\n" +
//                        "Email : pawnshopC0123@gmail.com\n" +
//                        "Address :\u200B2\u200B80\u200B \u200BTrần Hưng Đạo\u200B streets, \u200BSơn Trà\u200B District, Da Nang");
//            } catch (Exception e) {
//
//            }
            return ResponseEntity.ok(customer.getId());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email không đúng!!");
        }
    }

    @PostMapping("/checkCode")
    public ResponseEntity<?> checkCode(@RequestBody Users user) {
        Users users = usersService.findById(user.getId());
        if (users.getVerifyCode().toString().equals(user.getVerifyCode().toString())) {

            return ResponseEntity.ok(users.getId());
        } else {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xác nhận mã thất bại!!");
        }
    }

    @PatchMapping("/newPassword")
    public ResponseEntity<?> createNewPassword(@RequestBody Users user) {
        if (user.getPassword().length() < 8 || user.getPassword().length() > 20) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu không được ít hơn 8 hoăc nhiều hơn 50 kí tự!!");
        }
        try {
            usersService.saveNewPassword(user);
            return ResponseEntity.ok("Đổi mật khẩu thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đổi mật khẩu thất bại!!");
        }
    }
}