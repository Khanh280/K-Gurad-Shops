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
    public ResponseEntity<?> saveCartSession(@RequestBody ShoppingCart shoppingCart,HttpServletRequest httpServletRequest){
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
    @PostMapping("/save")
    public ResponseEntity<?> saveShoppingCart(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        System.out.println(shoppingCartList);
        System.out.println("Save success");
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/edit-cart/{operator}/{productId}")
    public ResponseEntity<?> updateCart(@PathVariable("operator") String operator,@PathVariable("productId")Long productId,HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        Integer sign = 0;
    switch (operator){
        case "minus":
            sign = -1;
            break;
        case "plus":
            sign = 1;
            break;
        default:
            sign =0;
    }
        if ( shoppingCartList != null){
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if(shoppingCartList.get(i).getProduct().getId()==productId){
                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity()+sign);
                    if(shoppingCartList.get(i).getQuantity() == 0){
                        shoppingCartList.remove(shoppingCartList.get(i));
                    }
                }
            }
        }
        session.setAttribute("cart",shoppingCartList);
    return new ResponseEntity<>(session.getAttribute("cart"),HttpStatus.OK);
    }
    @PostMapping("/delete-product-cart")
    public ResponseEntity<?> deleteProductCart(@RequestBody String productId,HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        if(shoppingCartList!=null){
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if(shoppingCartList.get(i).getProduct().getId()== Long.parseLong(productId)){
                    shoppingCartList.remove(shoppingCartList.get(i));
                    break;
                }
            }
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
