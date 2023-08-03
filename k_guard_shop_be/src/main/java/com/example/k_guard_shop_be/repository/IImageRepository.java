package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImageRepository extends JpaRepository<Images,Long> {
}
