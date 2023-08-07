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
import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select p.id          as id,\n" +
            "       p.name        as name,\n" +
            "       p.price       as price,\n" +
            "       p.quantity    as quantity,\n" +
            "       pt.name       as productType,\n" +
            "       p.description as description,\n" +
            "       i.link        as linkImage\n" +
            "from product p\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "         inner join brand b on p.brand_id = b.id\n" +
            "where p.is_delete = false \n" +
            "  and b.id = coalesce(:brandId, b.id)\n" +
            "and pt.id = coalesce(:productTypeId,pt.id) \n" +
            "and i.id IN (SELECT MIN(i.id) AS id\n" +
            "                                       FROM images i\n" +
            "                                       GROUP BY i.product_id)"
            , countQuery = "select count(*)" +
            "from product p\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "         inner join brand b on p.brand_id = b.id\n" +
            "where p.is_delete = false \n" +
            "  and b.id = coalesce(:brandId, b.id)\n" +
            "and pt.id = coalesce(:productTypeId,pt.id) \n" +
            "and i.id IN (SELECT MIN(i.id) AS id\n" +
            "                                       FROM images i\n" +
            "                                       GROUP BY i.product_id)"
            , nativeQuery = true)
    Page<IProductDTO> getAll(Pageable pageable, @Param("productTypeId") Long productTypeId, @Param("brandId") Long brandId);

    @Query(value = "select p.id          as id,\n" +
            "       p.name        as name,\n" +
            "       p.price       as price,\n" +
            "       p.quantity    as quantity,\n" +
            "       pt.name       as productType,\n" +
            "       p.description as description,\n" +
            "       i.link        as linkImage\n" +
            "from product p\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "         inner join brand b on p.brand_id = b.id\n" +
            "where p.is_delete = false\n" +
            "  and b.id = coalesce(:brandId, b.id)\n" +
            "  and i.id IN (SELECT MIN(i.id) AS id\n" +
            "               FROM images i\n" +
            "               GROUP BY i.product_id)"
            , countQuery = "select count(*)" +
            "from product p\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "         inner join brand b on p.brand_id = b.id\n" +
            "where p.is_delete = false\n" +
            "  and b.id = coalesce(:brandId, b.id)\n" +
            "  and i.id IN (SELECT MIN(i.id) AS id\n" +
            "               FROM images i\n" +
            "               GROUP BY i.product_id)"
            , nativeQuery = true)
    Page<IProductDTO> getAllByBrand(Pageable pageable, @Param("brandId") Long brandId);

    @Query(value = "select p.id          as id,\n" +
            "       p.name        as name,\n" +
            "       p.price       as price,\n" +
            "       p.quantity    as quantity,\n" +
            "       pt.name       as productType,\n" +
            "       p.description as description,\n" +
            "       i.link        as linkImage,\n" +
            "       p.create_date as createDate\n" +
            "from product p\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "         left join images i on p.id = i.product_id\n" +
            "where p.is_delete = false\n" +
            "  and pt.id = 1\n" +
            "  and i.id IN (SELECT MIN(i.id) AS id\n" +
            "               FROM images i\n" +
            "               GROUP BY i.product_id)\n" +
            "ORDER BY p.create_date DESC\n" +
            "LIMIT :quantity", nativeQuery = true)
    List<IProductDTO> getTopProduct(@Param("quantity") Integer quantity);

    @Modifying
    @Transactional
    @Query(value = "update product p set p.is_delete = true where p.id = :id", nativeQuery = true)
    void deleteProduct(@Param("id") Long id);

    @Query(value = "select * from product p where p.is_delete = false and p.id = :id", nativeQuery = true)
    Product getProductById(@Param("id") Long id);

    @Query(value = "select p.id          as id,\n" +
            "       p.name        as name,\n" +
            "       p.price       as price,\n" +
            "       p.quantity    as quantity,\n" +
            "       pt.name       as productType,\n" +
            "       p.description as description,\n" +
            "       i.link        as linkImage\n" +
            "from product p\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "where p.is_delete = false \n" +
            "and p.name like concat('%',:name,'%') \n" +
            "and i.id IN (SELECT MIN(i.id) AS id\n" +
            "                                       FROM images i\n" +
            "                                       GROUP BY i.product_id)"
            , countQuery = "select count(*)" +
            "from product p\n" +
            "         inner join images i on p.id = i.product_id\n" +
            "         inner join product_type pt on p.product_type_id = pt.id\n" +
            "where p.is_delete = false \n" +
            "and p.name like concat('%',:name,'%') \n" +
            "and i.id IN (SELECT MIN(i.id) AS id\n" +
            "                                       FROM images i\n" +
            "                                       GROUP BY i.product_id)"
            , nativeQuery = true)
    Page<IProductDTO> searchByName(Pageable pageable, @Param("name") String name);
}
