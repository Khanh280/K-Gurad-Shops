package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.config.JwtTokenUtil;
import com.example.k_guard_shop_be.config.JwtUserDetails;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.model.Users;
import com.example.k_guard_shop_be.service.IUsersService;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import com.example.k_guard_shop_be.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/shopping-cart")
public class ShoppingCartRestController {
    @Autowired
    private IShoppingCartService iShoppingCartService;
    @Autowired
    private IUsersService iUsersService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private ICustomerService iCustomerService;

    @PostMapping("")
    public ResponseEntity<?> saveCartSession(@RequestBody ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        HttpSession session = httpServletRequest.getSession();
        if (session.getAttribute("cart") != null) {
            shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
            int count = 0;
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCart.getProduct().getId() == shoppingCartList.get(i).getProduct().getId()) {
                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + shoppingCart.getQuantity());
                    count++;
                }
            }
            if (count == 0) {
                shoppingCartList.add(shoppingCart);
            }
        } else {
            session.setAttribute("cart", shoppingCartList);
            shoppingCartList.add(shoppingCart);
        }
        session.setAttribute("cart", shoppingCartList);
        return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
    }

    @PostMapping("/save-product")
    public ResponseEntity<?> saveProductToCart(@RequestBody ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        if (!header.equals("") && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            Users users = iUsersService.findByUsername(username);
            Customer customer = iCustomerService.getCustomerByUserId(users.getId());
            shoppingCart.setCustomer(customer);
            iShoppingCartService.saveShoppingCart(shoppingCart);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveShoppingCart(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        System.out.println(shoppingCartList);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit-cart/{operator}/{productId}")
    public ResponseEntity<?> updateCart(@PathVariable("operator") String operator, @PathVariable("productId") Long productId, HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        Integer sign = 0;
        switch (operator) {
            case "minus":
                sign = -1;
                break;
            case "plus":
                sign = 1;
                break;
            default:
                sign = 0;
        }
        if (shoppingCartList != null) {
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCartList.get(i).getProduct().getId() == productId) {
                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + sign);
                    if (shoppingCartList.get(i).getQuantity() == 0) {
                        shoppingCartList.remove(shoppingCartList.get(i));
                    }
                }
            }
        }
        session.setAttribute("cart", shoppingCartList);
        return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
    }

    @PostMapping("/delete-product-cart")
    public ResponseEntity<?> deleteProductCart(@RequestBody String productId, HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        if (shoppingCartList != null) {
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCartList.get(i).getProduct().getId() == Long.parseLong(productId)) {
                    shoppingCartList.remove(shoppingCartList.get(i));
                    break;
                }
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        session.setAttribute("cart", shoppingCartList);
        return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
    }

    @PostMapping("/session")
    public ResponseEntity<?> showCart(@RequestBody String isLogin,HttpServletRequest httpServletRequest) {
        System.out.println(isLogin);
        HttpSession session = httpServletRequest.getSession();
        return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
    }
}
