package com.example.k_guard_shop_be.service.order_detail;

import com.example.k_guard_shop_be.controller.CustomerRestController;
import com.example.k_guard_shop_be.dto.OrderDetailDTO;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.OrderDetail;
import com.example.k_guard_shop_be.repository.IOrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;
    @Autowired
    private CustomerRestController customerRestController;

    @Override
    public Page<OrderDetailDTO> getAllOrderDetailCustomer(HttpServletRequest httpServletRequest,Long orderId, Pageable pageable) {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        return iOrderDetailRepository.getAllOrderDetailCustomer(customer.getId(),orderId, pageable);
    }
}
