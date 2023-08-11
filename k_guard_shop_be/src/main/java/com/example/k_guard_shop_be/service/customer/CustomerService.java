package com.example.k_guard_shop_be.service.customer;

import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.repository.ICustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Override
    public Page<Customer> getAll(Pageable pageable) {
        return iCustomerRepository.getAll(pageable);
    }

    @Override
    public void saveCustomer(Customer customer) {
        iCustomerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(Long id) {
        iCustomerRepository.deleteCustomer(id);
    }

    @Override
    public Customer getCustomerByUserId(Long userId) {
        return iCustomerRepository.getCustomerByUserId(userId);
    }
}
