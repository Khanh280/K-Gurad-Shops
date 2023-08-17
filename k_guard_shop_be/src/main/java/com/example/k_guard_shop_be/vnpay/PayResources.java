package com.example.k_guard_shop_be.vnpay;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/vnpay")
public class PayResources {
    final
    PayService payService;

    public PayResources(PayService payService) {
        this.payService = payService;
    }

    @PostMapping("/pay")
    public ResponseEntity<?> pay(@RequestBody PayModel payModel, HttpServletRequest request){
        try {
            return new ResponseEntity<>(payService.payWithVNPAY(payModel, request), HttpStatus.OK);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("")
    public ResponseEntity<?> test(){
        return new ResponseEntity<>("asd",HttpStatus.OK);
    }
}