package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductTypeRepository extends JpaRepository<ProductType,Long> {
}
