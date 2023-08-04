package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ICustomerRepository extends JpaRepository<Customer,Long> {
    @Query(value = "select * from customer",nativeQuery = true)
    Page<Customer> getAll(Pageable pageable);
    @Modifying
    @Transactional
    @Query(value = "update customer c set c.is_delete = true where c.id=:id",nativeQuery = true)
    void deleteCustomer(@Param("id")Long id);
}
