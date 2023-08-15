package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrdersRepository extends JpaRepository<Orders,Long> {
}
