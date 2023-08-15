package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
