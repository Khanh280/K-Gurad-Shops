package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.model.ShoppingCart;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/shopping-cart")
public class ShoppingCartRestController {

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody ShoppingCart shoppingCart,HttpServletRequest httpServletRequest){
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        HttpSession session = httpServletRequest.getSession();
        if(session.getAttribute("cart") !=null){
            shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
            int count =0;
            for (int i = 0; i <shoppingCartList.size(); i++) {
                if(shoppingCart.getProduct().getId()==shoppingCartList.get(i).getProduct().getId()){
                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + shoppingCart.getQuantity());
                    count++;
                }
            }
            if(count == 0){
                shoppingCartList.add(shoppingCart);
            }
        }else {
            session.setAttribute("cart",shoppingCartList);
            shoppingCartList.add(shoppingCart);
        }
        session.setAttribute("cart",shoppingCartList);
        return new ResponseEntity<>(session.getAttribute("cart"),HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<?> showCart(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        return new ResponseEntity<>(session.getAttribute("cart"),HttpStatus.OK);
    }
}
