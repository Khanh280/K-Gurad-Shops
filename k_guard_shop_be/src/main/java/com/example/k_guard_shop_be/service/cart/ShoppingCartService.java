package com.example.k_guard_shop_be.service.cart;

import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.repository.IShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartService implements IShoppingCartService{
    @Autowired
    private IShoppingCartRepository iShoppingCartRepository;
    @Override
    public void saveShoppingCart(ShoppingCart shoppingCart) {
        iShoppingCartRepository.save(shoppingCart);
    }
}
