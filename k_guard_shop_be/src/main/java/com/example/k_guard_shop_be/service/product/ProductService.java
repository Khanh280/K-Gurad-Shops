package com.example.k_guard_shop_be.service.product;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.model.Product;
import com.example.k_guard_shop_be.repository.IImageRepository;
import com.example.k_guard_shop_be.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;
    @Autowired
    private IImageRepository iImageRepository;

    @Override
    public Page<IProductDTO> getAll(Pageable pageable) {
        return iProductRepository.getAll(pageable);
    }

    @Override
    public void saveProduct(Product product) {
        iProductRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        iProductRepository.deleteProduct(id);
    }

    @Override
    public Product getProductById(Long id) {
        return iProductRepository.getProductById(id);
    }
}
