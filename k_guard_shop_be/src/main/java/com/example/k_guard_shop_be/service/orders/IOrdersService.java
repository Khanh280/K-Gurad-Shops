package com.example.k_guard_shop_be.service.orders;

import com.example.k_guard_shop_be.model.Customer;

import javax.servlet.http.HttpServletRequest;

public interface IOrdersService {
    void saveOrder(HttpServletRequest httpServletRequest);
}
