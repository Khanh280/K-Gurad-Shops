package com.example.k_guard_shop_be.service.cart;

import com.example.k_guard_shop_be.model.ShoppingCart;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IShoppingCartService {
    ResponseEntity<?> saveShoppingCartSession(ShoppingCart shoppingCart, HttpServletRequest httpServletRequest);
    ResponseEntity<?> saveShoppingCart(ShoppingCart shoppingCart,HttpServletRequest httpServletRequest);
    ResponseEntity<?> updateShoppingCart(String operator, Long id, String isLogin, HttpServletRequest httpServletRequest);
    List<ShoppingCart> deleteCartSession(Long productId,HttpServletRequest httpServletRequest);
    List<ShoppingCart> getAll(Long customerId);
    ResponseEntity<?> showShoppingCart(HttpServletRequest httpServletRequest);
    void saveAllShoppingCart(ShoppingCart shoppingCartList);
    void deleteCartByCustomerId(Long cartId,Long customerId);
    ShoppingCart getShoppingCartById(Long cartId);
    ShoppingCart getShoppingCartByCustomerIdAndProductId(Long customerId,Long productId);
}
