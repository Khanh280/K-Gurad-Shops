package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductSizeRepository extends JpaRepository<ProductSize,Long> {
}
