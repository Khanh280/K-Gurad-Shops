package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.dto.ProductSizeDTO;
import com.example.k_guard_shop_be.model.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISizeRepository extends JpaRepository<Sizes, Long> {
    @Query(value = "select ps.id as id, ps.size_id as sizeId, s.name as sizeName from  product_size as ps\n" +
            "inner join product p on ps.product_id = p.id\n" +
            "inner join sizes s on ps.size_id = s.id\n" +
            "where p.id = :productId", nativeQuery = true)
    List<ProductSizeDTO> getAllSize(@Param("productId")Long productId);
}
