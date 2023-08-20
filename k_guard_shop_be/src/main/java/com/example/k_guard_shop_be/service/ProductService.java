package com.example.k_guard_shop_be.service;

import com.example.k_guard_shop_be.model.ProductSize;
import com.example.k_guard_shop_be.repository.IProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ProductService implements IProductSizeService{
    @Autowired
    private IProductSizeRepository iProductSizeRepository;
    @Override
    public ProductSize getProductSizeById(Long id) {
        return iProductSizeRepository.findById(id).get();
    }
}
