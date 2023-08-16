package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.service.orders.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrdersRestController {
    @Autowired
    private IOrdersService iOrdersService;
    @PostMapping("")
    public ResponseEntity<?> saveOrders(HttpServletRequest httpServletRequest){
        iOrdersService.saveOrder(httpServletRequest);
        System.out.println(5);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
