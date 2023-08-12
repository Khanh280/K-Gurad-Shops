package com.example.k_guard_shop_be.service.brand;

import com.example.k_guard_shop_be.model.Brand;

import java.util.List;

public interface IBrandService {
    List<Brand> getAll();
    Brand getBrandByProductId(Long productId);
}
