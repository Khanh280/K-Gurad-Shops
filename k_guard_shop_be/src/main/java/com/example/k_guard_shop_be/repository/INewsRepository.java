package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INewsRepository extends JpaRepository<News,Long> {
}
