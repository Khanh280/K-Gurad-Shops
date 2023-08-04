package com.example.k_guard_shop_be.service.product;

import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.repository.IImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImageService implements IImageService{
    @Autowired
    private IImageRepository iImageRepository;

    @Override
    public void saveImage(List<Images> imagesList) {
        iImageRepository.saveAll(imagesList);
    }

    @Override
    public List<Images> getAllByProductId(Long id) {
        return iImageRepository.getAllByProductId(id);
    }
}
