package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.dto.OrderDTO;
import com.example.k_guard_shop_be.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IOrdersRepository extends JpaRepository<Orders, Long> {
    @Query(value = "select o.id                        as id,\n" +
            "       o.create_date               as createDate,\n" +
            "       sum(od.price * od.quantity) as totalPrice\n" +
            "from orders o\n" +
            "         inner join customer c on o.customer_id = c.id\n" +
            "         inner join order_detail od on o.id = od.orders_id\n" +
            "where o.customer_id = :customerId\n" +
            "group by o.id", nativeQuery = true)
    Page<OrderDTO> getAllOrderCustomer(@Param("customerId") Long customerId, Pageable pageable);
}
