package com.example.k_guard_shop_be.dto;

import com.example.k_guard_shop_be.model.Product;
import com.example.k_guard_shop_be.model.ProductSize;
import com.example.k_guard_shop_be.model.ShoppingCart;

public class ShoppingDTO {
    private ShoppingCart shoppingCart;
    private ProductSize productSize;

    public ShoppingDTO() {
    }

    public ShoppingDTO(ShoppingCart shoppingCart, ProductSize productSize) {
        this.shoppingCart = shoppingCart;
        this.productSize = productSize;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public ProductSize getProductSize() {
        return productSize;
    }

    public void setProductSize(ProductSize productSize) {
        this.productSize = productSize;
    }
}
