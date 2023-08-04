package com.example.k_guard_shop_be.service.customer;

import com.example.k_guard_shop_be.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICustomerService {
    Page<Customer> getAll(Pageable pageable);
    void saveCustomer(Customer customer);
    void deleteCustomer(Long id);
}
