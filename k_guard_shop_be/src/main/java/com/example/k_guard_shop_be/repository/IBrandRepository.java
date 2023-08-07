package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBrandRepository extends JpaRepository<Brand,Long> {
}
