package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IShoppingCartRepository extends JpaRepository<ShoppingCart,Long> {
}
