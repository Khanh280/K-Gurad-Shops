package com.example.k_guard_shop_be.repository;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ManyToOne;

public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select p.id          as id,\n" +
            "       p.name        as name,\n" +
            "       p.price       as price,\n" +
            "       p.quantity    as quantity,\n" +
            "       pt.name       as productType,\n" +
            "       p.description as description\n" +
            "from product p\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "where p.is_delete = false",
            countQuery = "select count(*)" +
                    "from product p\n" +
                    "         inner join product_type pt on p.product_type_id = pt.id\n" +
                    "where p.is_delete = false"
            , nativeQuery = true)
    Page<IProductDTO> getAll(Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "update product p set p.is_delete = true where p.id = :id", nativeQuery = true)
    void deleteProduct(@Param("id") Long id);

    @Query(value = "select * from product p where p.is_delete = false and p.id = :id",nativeQuery = true)
    Product getProductById(@Param("id") Long id);
}
