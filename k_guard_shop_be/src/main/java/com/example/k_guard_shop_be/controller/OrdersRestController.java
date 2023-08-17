package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import com.example.k_guard_shop_be.service.orders.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrdersRestController {
    @Autowired
    private IOrdersService iOrdersService;
    @Autowired
    private IShoppingCartService iShoppingCartService;
    @Autowired
    private CustomerRestController customerRestController;

    @PostMapping("")
    public ResponseEntity<?> saveOrders(HttpServletRequest httpServletRequest) {
        try {
            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
            iOrdersService.saveOrder(httpServletRequest);
            List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
            return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
