package com.example.k_guard_shop_be.service.brand;

import com.example.k_guard_shop_be.model.Brand;
import com.example.k_guard_shop_be.repository.IBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService implements IBrandService{
    @Autowired
    private IBrandRepository iBrandRepository;

    @Override
    public List<Brand> getAll() {
        return iBrandRepository.findAll();
    }

    @Override
    public Brand getBrandByProductId(Long productId) {
        return iBrandRepository.getBrandByProductId(productId);
    }
}
