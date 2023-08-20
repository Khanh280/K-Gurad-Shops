package com.example.k_guard_shop_be.service;

import com.example.k_guard_shop_be.model.ProductSize;
import com.example.k_guard_shop_be.repository.IProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductSizeService implements IProductSizeService{
    @Autowired
    private IProductSizeRepository iProductSizeRepository;
    @Override
    public ProductSize getProductSizeById(Long id) {
        return iProductSizeRepository.findById(id).get();
    }
}
