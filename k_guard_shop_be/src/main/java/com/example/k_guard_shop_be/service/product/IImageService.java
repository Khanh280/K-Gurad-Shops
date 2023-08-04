package com.example.k_guard_shop_be.service.product;

import com.example.k_guard_shop_be.model.Images;

import java.util.List;

public interface IImageService {
    void saveImage (List<Images> imagesList);

    List<Images> getAllByProductId(Long id);
}
