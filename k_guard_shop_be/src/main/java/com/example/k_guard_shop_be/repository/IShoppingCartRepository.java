package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IShoppingCartRepository extends JpaRepository<ShoppingCart,Long> {
    @Query(value = "select sc.* from shopping_cart sc where sc.is_delete = false and sc.customer_id = :customerId ORDER BY sc.id DESC",nativeQuery = true)
    List<ShoppingCart> getAll(@Param("customerId")Long customerId);
    @Modifying
    @Transactional
    @Query(value = "delete from shopping_cart  sc where sc.id = :cartId and sc.customer_id = :customerId",nativeQuery = true)
    void deleteCart(@Param("cartId")Long cartId,@Param("customerId")Long customerId);
    @Query(value = "select sc.* from shopping_cart sc where sc.is_delete = false and sc.id = :cartId",nativeQuery = true)
    ShoppingCart getCartById(@Param("cartId")Long cartId);
    @Query(value = "select sc.* from shopping_cart sc where sc.is_delete = false and sc.customer_id = :customerId and sc.product_size_id = :product_size_id",nativeQuery = true)
    ShoppingCart getCartByCustomerIdAndProductSizeId(@Param("customerId")Long customerId,@Param("product_size_id")Long product_size_id);
}
