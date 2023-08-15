package com.example.k_guard_shop_be.service.product;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.dto.ProductDTO;
import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.model.Product;
import com.example.k_guard_shop_be.model.Sizes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Map;

public interface IProductService {
    Page<IProductDTO> getAll(Pageable pageable,String productType,Long brandId,String nameSearch);
    Page<IProductDTO> getAllByBrand(Pageable pageable,Long brand);
    List<IProductDTO> getTopProduct(Integer quantity);
    Page<IProductDTO> searchByName(Pageable pageable,String name,String productType,Long brandId);
    void saveProduct(ProductDTO productDTO);
    void deleteProduct(Long id);
    Product getProductById(Long id);
    List<Sizes> getAllSize();
    Map<String,String> validateProduct(BindingResult bindingResult);
}
