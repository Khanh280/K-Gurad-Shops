package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Brand;
import com.example.k_guard_shop_be.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IProductTypeRepository extends JpaRepository<ProductType,Long> {
    @Query(value = "select pt.* from product_type pt inner join product p on pt.id = p.brand_id where p.id = :productId",nativeQuery = true)
    ProductType getProductTypeByProductId(@Param("productId")Long productId);
}
