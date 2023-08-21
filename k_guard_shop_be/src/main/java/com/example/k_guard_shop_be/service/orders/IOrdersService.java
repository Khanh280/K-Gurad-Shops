package com.example.k_guard_shop_be.service.orders;

import com.example.k_guard_shop_be.dto.OrderDTO;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.OrderDetail;
import com.example.k_guard_shop_be.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IOrdersService {
    Page<OrderDTO> getAllOrderCustomer(HttpServletRequest httpServletRequest, Pageable pageable);
    List<OrderDetail> saveOrder(HttpServletRequest httpServletRequest,String payment);
}
