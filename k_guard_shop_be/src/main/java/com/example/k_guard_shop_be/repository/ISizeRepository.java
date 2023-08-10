package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISizeRepository extends JpaRepository<Sizes,Long> {
}
