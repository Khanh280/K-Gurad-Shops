package com.example.k_guard_shop_be.service.cart;

import com.example.k_guard_shop_be.model.ShoppingCart;

import java.util.List;

public interface IShoppingCartService {
    void saveShoppingCart(ShoppingCart shoppingCart);
    List<ShoppingCart> getAll(Long customerId);
    void saveAllShoppingCart(ShoppingCart shoppingCartList);
    void deleteCartByCustomerId(Long cartId,Long customerId);
    ShoppingCart getShoppingCartById(Long cartId);
}