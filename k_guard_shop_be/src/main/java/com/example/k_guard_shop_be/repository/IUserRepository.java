package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends JpaRepository<Users,Long> {
    Users findByUsername(String username);

    @Query(value = "select u from users u where u.username=:username ",nativeQuery = true)
    Users getByUsername(@Param("username") String username);
    @Modifying
    @Query(value = "UPDATE users SET password = :password WHERE id = :id", nativeQuery = true)
    void saveNewPassword(@Param("id") Long id, @Param("password") String password);

}
