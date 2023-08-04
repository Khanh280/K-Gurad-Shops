package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.CustomerDTO;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.service.customer.ICustomerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/customer")
public class CustomerRestController {
    @Autowired
    private ICustomerService iCustomerService;

    @GetMapping("")
    public ResponseEntity<Page<Customer>> getAllCustomer(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 8);
        Page<Customer> customerPage = iCustomerService.getAll(pageable);
        return new ResponseEntity<>(customerPage, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> saveCustomer(@Validated @RequestBody CustomerDTO customerDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO,customer);
        iCustomerService.saveCustomer(customer);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("")
    public ResponseEntity<?> deleteCustomer(@RequestBody String id){
        iCustomerService.deleteCustomer(Long.parseLong(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
