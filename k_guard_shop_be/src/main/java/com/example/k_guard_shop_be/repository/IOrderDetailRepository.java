package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.dto.OrderDetailDTO;
import com.example.k_guard_shop_be.model.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query(value = "select od.id       as id,\n" +
            "       p.name      as productName,\n" +
            "       s.name      as size,\n" +
            "       od.quantity as quantity,\n" +
            "       od.price    as price,\n" +
            "       i.link      as linkImage,\n" +
            "       p.id        as productId\n" +
            "from order_detail as od\n" +
            "         inner join orders o on od.orders_id = o.id\n" +
            "         inner join product_size ps on od.product_size_id = ps.id\n" +
            "         inner join product p on ps.product_id = p.id\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join sizes s on ps.size_id = s.id\n" +
            "where o.customer_id = :customerId\n" +
            "  and o.id = :orderId\n" +
            "  and i.id in (select MIN(i.id)\n" +
            "               from images as i\n" +
            "               group by i.product_id)", nativeQuery = true)
    Page<OrderDetailDTO> getAllOrderDetailCustomer(@Param("customerId") Long customerId, @Param("orderId") Long orderId, Pageable pageable);
    @Query(value = "select od.id       as id,\n" +
            "       p.name      as productName,\n" +
            "       s.name      as size,\n" +
            "       od.quantity as quantity,\n" +
            "       od.price    as price,\n" +
            "       i.link      as linkImage,\n" +
            "       p.id        as productId\n" +
            "from order_detail as od\n" +
            "         inner join orders o on od.orders_id = o.id\n" +
            "         inner join product_size ps on od.product_size_id = ps.id\n" +
            "         inner join product p on ps.product_id = p.id\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join sizes s on ps.size_id = s.id\n" +
            "where o.id = :orderId\n" +
            "  and i.id in (select MIN(i.id)\n" +
            "               from images as i\n" +
            "               group by i.product_id)", nativeQuery = true)
    Page<OrderDetailDTO> getOrderDetail(@Param("orderId")Long orderId, Pageable pageable);
}
