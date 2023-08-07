package com.example.k_guard_shop_be.service.product;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    Page<IProductDTO> getAll(Pageable pageable,String productType);
    Page<IProductDTO> getAllByBrand(Pageable pageable,Long brand);
    List<IProductDTO> getTopProduct(Integer quantity);
    void saveProduct(Product product);
    void deleteProduct(Long id);
    Product getProductById(Long id);
}
