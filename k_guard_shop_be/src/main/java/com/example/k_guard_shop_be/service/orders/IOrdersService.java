package com.example.k_guard_shop_be.service.orders;

import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.OrderDetail;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IOrdersService {
    List<OrderDetail> saveOrder(HttpServletRequest httpServletRequest);
}
