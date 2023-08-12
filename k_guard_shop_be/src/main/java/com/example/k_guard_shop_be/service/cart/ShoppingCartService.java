package com.example.k_guard_shop_be.service.cart;

import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.repository.IShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService implements IShoppingCartService {
    @Autowired
    private IShoppingCartRepository iShoppingCartRepository;

    @Override
    public void saveShoppingCart(ShoppingCart shoppingCart) {
        iShoppingCartRepository.save(shoppingCart);
    }

    @Override
    public List<ShoppingCart> getAll(Long customerId) {
        return iShoppingCartRepository.getAll(customerId);
    }

    @Override
    public void saveAllShoppingCart(ShoppingCart shoppingCart) {

        iShoppingCartRepository.save(shoppingCart);

    }

    @Override
    public void deleteCartByCustomerId(Long cartId,Long customerId) {
        iShoppingCartRepository.deleteCart(cartId,customerId);
    }

    @Override
    public ShoppingCart getShoppingCartById(Long cartId) {
        return iShoppingCartRepository.getCartById(cartId);
    }
}
