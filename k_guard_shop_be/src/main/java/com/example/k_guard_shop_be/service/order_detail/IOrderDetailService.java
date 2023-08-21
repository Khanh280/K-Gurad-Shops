package com.example.k_guard_shop_be.service.order_detail;

import com.example.k_guard_shop_be.dto.OrderDetailDTO;
import com.example.k_guard_shop_be.model.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;

public interface IOrderDetailService {
    Page<OrderDetailDTO> getAllOrderDetailCustomer(HttpServletRequest httpServletRequest, Pageable pageable);

}
