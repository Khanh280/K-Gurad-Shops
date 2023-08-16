package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.config.JwtTokenUtil;
import com.example.k_guard_shop_be.model.*;
import com.example.k_guard_shop_be.service.IUsersService;
import com.example.k_guard_shop_be.service.brand.IBrandService;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import com.example.k_guard_shop_be.service.customer.ICustomerService;
import com.example.k_guard_shop_be.service.product_type.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    private IUsersService iUsersService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private IBrandService iBrandService;
    @Autowired
    private IProductTypeService iProductTypeService;
    @Autowired
    private CustomerRestController customerRestController;

    @PostMapping("")
    public ResponseEntity<?> saveCartSession(@RequestBody ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        ResponseEntity<?> shoppingCartList = iShoppingCartService.saveShoppingCartSession(shoppingCart, httpServletRequest);
        if (shoppingCartList.getStatusCode() == HttpStatus.BAD_REQUEST) {
            return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.OK);
//        HttpSession session = httpServletRequest.getSession();
//        Brand brand = iBrandService.getBrandByProductId(shoppingCart.getProduct().getId());
//        ProductType productType = iProductTypeService.getProductTypeByProductId(shoppingCart.getProduct().getId());
//        shoppingCart.getProduct().setBrand(brand);
//        shoppingCart.getProduct().setProductType(productType);
//        if (session.getAttribute("cart") != null) {
//            shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
//            int count = 0;
//            for (int i = 0; i < shoppingCartList.size(); i++) {
//                if (shoppingCart.getProduct().getId() == shoppingCartList.get(i).getProduct().getId()) {
//                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + shoppingCart.getQuantity());
//                    count++;
//                }
//            }
//            if (count == 0) {
//                shoppingCartList.add(shoppingCart);
//            }
//        } else {
//            session.setAttribute("cart", shoppingCartList);
//            shoppingCartList.add(shoppingCart);
//        }
//        session.setAttribute("cart", shoppingCartList);
//        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/save-product")
    public ResponseEntity<?> saveProductToCart(@RequestBody ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
//        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
//        if (customer != null) {
//            List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
//            ShoppingCart newShoppingCart = new ShoppingCart();
//            int count = 0;
//            for (int i = 0; i < shoppingCartList.size(); i++) {
//                if (shoppingCartList.get(i).getProduct().getId() == shoppingCart.getProduct().getId()) {
//                    newShoppingCart = shoppingCartList.get(i);
//                    newShoppingCart.setQuantity(newShoppingCart.getQuantity() + shoppingCart.getQuantity());
//                    count++;
//                    break;
//                }
//            }
//            if (count == 0) {
//                shoppingCart.setCustomer(customer);
//                iShoppingCartService.saveShoppingCart(shoppingCart);
//            } else {
//                iShoppingCartService.saveShoppingCart(newShoppingCart);
//            }
//        } else {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//        List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
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
//        HttpSession session = httpServletRequest.getSession();
//        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
//        Integer sign = 0;
//        switch (operator) {
//            case "minus":
//                sign = -1;
//                break;
//            case "plus":
//                sign = 1;
//                break;
//            default:
//                sign = 0;
//        }
//        if (isLogin.equals("true")) {
//            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
//            ShoppingCart shoppingCart = iShoppingCartService.getShoppingCartById(id);
//            shoppingCart.setQuantity(shoppingCart.getQuantity() + sign);
//            if (shoppingCart.getQuantity() == 0) {
//                iShoppingCartService.deleteCartByCustomerId(shoppingCart.getId(), customer.getId());
//            } else {
////                iShoppingCartService.saveShoppingCart(shoppingCart);
//            }
//            return new ResponseEntity<>(iShoppingCartService.getAll(customer.getId()), HttpStatus.OK);
//        } else {
//            if (shoppingCartList != null) {
//                for (int i = 0; i < shoppingCartList.size(); i++) {
//                    if (shoppingCartList.get(i).getProduct().getId() == id) {
//                        shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + sign);
//                        if (shoppingCartList.get(i).getQuantity() == 0) {
//                            shoppingCartList.remove(shoppingCartList.get(i));
//                        }
//                    }
//                }
//            }
//            session.setAttribute("cart", shoppingCartList);
//            return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
//        }
        ResponseEntity<?> shoppingCartList = iShoppingCartService.updateShoppingCart(operator, id, isLogin, httpServletRequest);
        if (shoppingCartList.getStatusCode() == HttpStatus.BAD_REQUEST) {
            return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(shoppingCartList.getBody(), HttpStatus.OK);
    }

    @PostMapping("/delete-cart-session")
    public ResponseEntity<?> deleteProductCartSession(@RequestBody String productId, HttpServletRequest httpServletRequest) {
//        HttpSession session = httpServletRequest.getSession();
//        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
//        if (shoppingCartList != null) {
//            for (int i = 0; i < shoppingCartList.size(); i++) {
//                if (shoppingCartList.get(i).getProduct().getId() == Long.parseLong(productId)) {
//                    shoppingCartList.remove(shoppingCartList.get(i));
//                    break;
//                }
//            }
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        session.setAttribute("cart", shoppingCartList);
        List<ShoppingCart> shoppingCartList = iShoppingCartService.deleteCartSession(Long.parseLong(productId), httpServletRequest);
        if (shoppingCartList != null) {
            return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/delete-cart-login")
    public ResponseEntity<?> deleteProductCartLogin(@RequestBody String cartId, HttpServletRequest httpServletRequest) {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        iShoppingCartService.deleteCartByCustomerId(Long.parseLong(cartId), customer.getId());
        return new ResponseEntity<>(iShoppingCartService.getAll(customer.getId()), HttpStatus.OK);
    }

    //     if (!token.equals("null")) {
//        username = jwtTokenUtil.getUsernameFromToken(token);
//        Users users = iUsersService.findByUsername(username);
//        customer = iCustomerService.getCustomerByUserId(users.getId());
//        if(session.getAttribute("cart")!= null){
//            List<ShoppingCart> cartSession = (List<ShoppingCart>) session.getAttribute("cart");
//            for (ShoppingCart cart: cartSession){
//                cart.setCustomer(customer);
//                shoppingCartList.add(cart);
//            }
//            iShoppingCartService.saveAllShoppingCart(shoppingCartList);
//            session.removeAttribute("cart");
//        }
//    }
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
//                Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
//                if (session.getAttribute("cart") != null) {
//                    List<ShoppingCart> cartSession = (List<ShoppingCart>) session.getAttribute("cart");
//                    for (int i = 0; i < cartSession.size(); i++) {
//                        ShoppingCart newCart = new ShoppingCart();
//                        ShoppingCart cartDuplicate = iShoppingCartService.getShoppingCartByCustomerIdAndProductId(customer.getId(), cartSession.get(i).getProduct().getId());
//                        if (cartDuplicate != null) {
//                            cartDuplicate.setQuantity(cartSession.get(i).getQuantity() + cartDuplicate.getQuantity());
////                            iShoppingCartService.saveShoppingCart(cartDuplicate);
//                        } else {
//                            newCart.setCustomer(customer);
//                            newCart.setProduct(cartSession.get(i).getProduct());
//                            newCart.setQuantity(cartSession.get(i).getQuantity());
//                            newCart.setImage(cartSession.get(i).getImage());
//                            shoppingCartList.add(newCart);
////                            iShoppingCartService.saveShoppingCart(newCart);
//                        }
//                    }
//                    session.removeAttribute("cart");
//                }
//                if (customer != null) {
//                    shoppingCartList = iShoppingCartService.getAll(customer.getId());
//                }
//                return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
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
