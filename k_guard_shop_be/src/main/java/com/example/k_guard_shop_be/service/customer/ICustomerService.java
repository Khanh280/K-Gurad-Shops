package com.example.k_guard_shop_be.service.customer;

import com.example.k_guard_shop_be.dto.CustomerDTO;
import com.example.k_guard_shop_be.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;

import java.util.Map;

public interface ICustomerService {
    Page<Customer> getAll(Pageable pageable);
    void saveCustomer(CustomerDTO customerDTO);
    void deleteCustomer(Long id);
    Customer getCustomerByUserId(Long userId);
    Map<String,String> validateCustomer(CustomerDTO customerDTO, BindingResult bindingResult);
}
