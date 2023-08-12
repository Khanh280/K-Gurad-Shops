package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IShoppingCartRepository extends JpaRepository<ShoppingCart,Long> {
    @Query(value = "select sc.* from shopping_cart sc where sc.is_delete = false and sc.customer_id = :customerId",nativeQuery = true)
    List<ShoppingCart> getAll(@Param("customerId")Long customerId);
    @Modifying
    @Transactional
    @Query(value = "update shopping_cart  sc set sc.is_delete = true where sc.is_delete = false and sc.id = :cartId and sc.customer_id = :customerId",nativeQuery = true)
    void deleteCart(@Param("cartId")Long cartId,@Param("customerId")Long customerId);
    @Query(value = "select sc.* from shopping_cart sc where sc.is_delete = false and sc.id = :cartId",nativeQuery = true)
    ShoppingCart getCartById(@Param("cartId")Long cartId);
}
