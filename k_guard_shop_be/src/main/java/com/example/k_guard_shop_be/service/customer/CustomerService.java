package com.example.k_guard_shop_be.service.customer;

import com.example.k_guard_shop_be.dto.CustomerDTO;
import com.example.k_guard_shop_be.dto.UserDTO;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.Roles;
import com.example.k_guard_shop_be.model.Users;
import com.example.k_guard_shop_be.repository.ICustomerRepository;
import com.example.k_guard_shop_be.service.IUsersService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;
    @Autowired
    private IUsersService iUsersService;

    @Override
    public Page<Customer> getAll(Pageable pageable) {
        return iCustomerRepository.getAll(pageable);
    }

    @Override
    @Transactional
    public void saveCustomer(CustomerDTO customerDTO) {
        UserDTO userDTO = customerDTO.getUserDTO();
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO, customer);
        String salt = BCrypt.gensalt();
        String test = BCrypt.hashpw(customerDTO.getUserDTO().getPassword(), salt);

        Users users = new Users(null, userDTO.getUsername(), userDTO.getPassword(), null, null);
        BeanUtils.copyProperties(customerDTO.getUserDTO(),users);
        users.setPassword(test);
        users.setRoles(new Roles(2L, "ROLE_CUSTOMER"));
        customer.setUsers(users);
        iUsersService.createUser(users);
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

    @Override
    public Map<String, String> validateCustomer(CustomerDTO customerDTO, BindingResult bindingResult) {
        UserDTO userDTO = customerDTO.getUserDTO();
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            if (!userDTO.getConfirmPassword().equals(userDTO.getPassword())) {
                errorMap.put("password", "Mật khẩu không trùng khớp");
//                return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
            }
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
            return errorMap;
        }
        return null;
    }
}
