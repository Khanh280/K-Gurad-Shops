package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IImageRepository extends JpaRepository<Images, Long> {
    @Query(value = "select i.* from images i\n" +
            "inner join product p on i.product_id = p.id\n" +
            "where p.id = :id", nativeQuery = true)
    List<Images> getAllByProductId(@Param("id") Long id);
}
