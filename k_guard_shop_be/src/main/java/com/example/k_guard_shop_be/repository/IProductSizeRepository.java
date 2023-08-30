package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IProductSizeRepository extends JpaRepository<ProductSize,Long> {
    @Query(value = "select * from product_size as ps where ps.product_id = :productId",nativeQuery = true)
    ProductSize getProductSizeByProductId(@Param("productId")Long productId);
}
