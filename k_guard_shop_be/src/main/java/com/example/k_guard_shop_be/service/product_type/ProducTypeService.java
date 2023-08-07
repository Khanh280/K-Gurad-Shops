package com.example.k_guard_shop_be.service.product_type;

import com.example.k_guard_shop_be.model.ProductType;
import com.example.k_guard_shop_be.repository.IProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducTypeService implements IProductTypeService{
    @Autowired
    private IProductTypeRepository iProductTypeRepository;
    @Override
    public List<ProductType> getAll() {
        return iProductTypeRepository.findAll();
    }
}
