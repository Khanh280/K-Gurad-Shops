package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IBrandRepository extends JpaRepository<Brand,Long> {
    @Query(value = "select b.* from brand b inner join product p on b.id = p.brand_id where p.id = :productId",nativeQuery = true)
    Brand getBrandByProductId(@Param("productId")Long productId);
}
