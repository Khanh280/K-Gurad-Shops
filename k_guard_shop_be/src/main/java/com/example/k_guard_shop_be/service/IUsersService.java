package com.example.k_guard_shop_be.service;


import com.example.k_guard_shop_be.model.Users;

public interface IUsersService { Users findByUsername(String username);
    Users findByEmail(String email);
    void editUser(Users users);

    Users findById(Long id);
    void saveNewPassword(Users users);
    void createUser(Users users);
}
