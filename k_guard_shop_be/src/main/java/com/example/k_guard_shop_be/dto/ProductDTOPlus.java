package com.example.k_guard_shop_be.dto;

import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.model.ProductSize;

import java.util.List;

public class ProductDTOPlus {
    private Long id;
    private ProductSize productSize;
    private List<Images> imagesList;

    public ProductDTOPlus() {
    }

    public ProductDTOPlus(ProductSize productSize, List<Images> imagesList) {
        this.productSize = productSize;
        this.imagesList = imagesList;
    }

    public ProductDTOPlus(Long id, ProductSize productSize, List<Images> imagesList) {
        this.id = id;
        this.productSize = productSize;
        this.imagesList = imagesList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductSize getProductSize() {
        return productSize;
    }

    public void setProductSize(ProductSize productSize) {
        this.productSize = productSize;
    }

    public List<Images> getImagesList() {
        return imagesList;
    }

    public void setImagesList(List<Images> imagesList) {
        this.imagesList = imagesList;
    }
}
