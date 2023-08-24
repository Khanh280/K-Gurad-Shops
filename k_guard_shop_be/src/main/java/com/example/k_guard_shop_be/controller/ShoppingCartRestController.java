package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.config.JwtTokenUtil;
import com.example.k_guard_shop_be.dto.ShoppingDTO;
import com.example.k_guard_shop_be.model.*;
import com.example.k_guard_shop_be.service.IUsersService;
import com.example.k_guard_shop_be.service.brand.IBrandService;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import com.example.k_guard_shop_be.service.customer.ICustomerService;
import com.example.k_guard_shop_be.service.product_type.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/shopping-cart")
public class ShoppingCartRestController {
    @Autowired
    private IShoppingCartService iShoppingCartService;
//    @Autowired
//    private IUsersService iUsersService;
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//    @Autowired
//    private ICustomerService iCustomerService;
//    @Autowired
//    private IBrandService iBrandService;
//    @Autowired
//    private IProductTypeService iProductTypeService;
    @Autowired
    private CustomerRestController customerRestController;

    @PostMapping("")
    public ResponseEntity<?> saveCartSession(@RequestBody ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        ResponseEntity<?> shoppingCartList = iShoppingCartService.saveShoppingCartSession(shoppingCart, httpServletRequest);
        if (shoppingCartList.getStatusCode() == HttpStatus.BAD_REQUEST) {
            return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.OK);
    }

    @PostMapping("/save-product")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> saveProductToCart(@RequestBody ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        ResponseEntity<?> shoppingCartList = iShoppingCartService.saveShoppingCart(shoppingCart, httpServletRequest);
        if (shoppingCartList.getStatusCode() == HttpStatus.BAD_REQUEST) {
            return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveShoppingCart(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        System.out.println(shoppingCartList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/edit-cart/{operator}/{id}")
    public ResponseEntity<?> updateCart(@PathVariable("operator") String operator, @PathVariable("id") Long id, @RequestBody String isLogin, HttpServletRequest httpServletRequest) {
        ResponseEntity<?> shoppingCartList = iShoppingCartService.updateShoppingCart(operator, id, isLogin, httpServletRequest);
        if (shoppingCartList.getStatusCode() == HttpStatus.BAD_REQUEST) {
            return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.OK);
    }

    @PostMapping("/delete-cart-session")
    public ResponseEntity<?> deleteProductCartSession(@RequestBody String productId, HttpServletRequest httpServletRequest) {
        List<ShoppingCart> shoppingCartList = iShoppingCartService.deleteCartSession(Long.parseLong(productId), httpServletRequest);
        if (shoppingCartList != null) {
            return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/delete-cart-login")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> deleteProductCartLogin(@RequestBody String cartId, HttpServletRequest httpServletRequest) {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        iShoppingCartService.deleteCartByCustomerId(Long.parseLong(cartId), customer.getId());
        return new ResponseEntity<>(iShoppingCartService.getAll(customer.getId()), HttpStatus.OK);
    }

    @PostMapping("/showCart")
    public ResponseEntity<?> showCart(@RequestBody String isLogin, HttpServletRequest httpServletRequest) {
        System.out.println(isLogin);
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        switch (isLogin) {
            case "true":
                ResponseEntity<?> shoppingCartList1 = iShoppingCartService.showShoppingCart(httpServletRequest);
                if (shoppingCartList1 != null) {
                    return new ResponseEntity<>(shoppingCartList1.getBody(), HttpStatus.OK);

                }
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            case "false":
                if (session.getAttribute("cart") == null) {
                    session.setAttribute("cart", shoppingCartList);
                }
                return new ResponseEntity<>((List<ShoppingCart>) session.getAttribute("cart"), HttpStatus.OK);
            case "logout":
                session.removeAttribute("cart");
                return new ResponseEntity<>(null, HttpStatus.OK);
            default:
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
