package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.CustomerDTO;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.Roles;
import com.example.k_guard_shop_be.model.Users;
import com.example.k_guard_shop_be.service.IUsersService;
import com.example.k_guard_shop_be.service.customer.ICustomerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/customer")
public class CustomerRestController {
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private IUsersService iUsersService;

    @GetMapping("")
    public ResponseEntity<Page<Customer>> getAllCustomer(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 8);
        Page<Customer> customerPage = iCustomerService.getAll(pageable);
        return new ResponseEntity<>(customerPage, HttpStatus.OK);
    }

    @Transactional
    @PostMapping("")
    public ResponseEntity<?> saveCustomer(@Validated @RequestBody CustomerDTO customerDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            String[] fieldToCheck = {"name", "address", "phoneNumber", "gender", "email", "userDTO.username", "userDTO.password"};
            for (String field : fieldToCheck) {
                FieldError fieldError = bindingResult.getFieldError(field);
                if (fieldError != null) {
                    if (field.equals("userDTO.username")) {
                        field = "username";
                    } else if (field.equals("userDTO.password")) {
                        field = "password";
                    }
                    errorMap.put(field, fieldError.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO, customer);
        String salt = BCrypt.gensalt();
        String test = BCrypt.hashpw(customer.getUsers().getPassword(), salt);
        Users users = customer.getUsers();
        users.setPassword(test);
        users.setRoles(new Roles(2L, "ROLE_CUSTOMER"));
        customer.setUsers(users);
        iUsersService.createUser(users);
        iCustomerService.saveCustomer(customer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteCustomer(@RequestBody String id) {
        iCustomerService.deleteCustomer(Long.parseLong(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
