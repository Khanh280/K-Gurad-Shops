package com.example.k_guard_shop_be.service.product;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.dto.ProductDTO;
import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.model.Product;
import com.example.k_guard_shop_be.model.Sizes;
import com.example.k_guard_shop_be.repository.IImageRepository;
import com.example.k_guard_shop_be.repository.IProductRepository;
import com.example.k_guard_shop_be.repository.ISizeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;
    @Autowired
    private IImageRepository iImageRepository;
    @Autowired
    private ISizeRepository iSizeRepository;
    @Autowired
    private IImageService iImageService;

    @Override
    public Page<IProductDTO> getAll(Pageable pageable, String productType, Long brandId, String nameSearch) {
        Long productTypeId = checkProductType(productType);
        return iProductRepository.getAll(pageable, productTypeId, brandId, nameSearch);
    }

    @Override
    public Page<IProductDTO> getAllByBrand(Pageable pageable, Long brand) {
        return iProductRepository.getAllByBrand(pageable, brand);
    }

    @Override
    public List<IProductDTO> getTopProduct(Integer quantity) {
        return iProductRepository.getTopProduct(quantity);
    }

    @Override
    public Page<IProductDTO> searchByName(Pageable pageable, String name, String productType, Long brandId) {
        Long productTypeId = checkProductType(productType);
        return iProductRepository.searchByName(pageable, name, productTypeId, brandId);
    }

    @Transactional
    @Override
    public void saveProduct(ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        iProductRepository.save(product);
        List<Images> imagesList = new ArrayList<>();
        for (Images i : productDTO.getImage()) {
            imagesList.add(new Images(i.getId(), product, i.getLink()));
        }
        iImageService.saveImage(imagesList);
    }

    @Override
    public void deleteProduct(Long id) {
        iProductRepository.deleteProduct(id);
    }

    @Override
    public Product getProductById(Long id) {
        return iProductRepository.getProductById(id);
    }

    @Override
    public List<Sizes> getAllSize() {
        return iSizeRepository.findAll();
    }

    @Override
    public Map<String, String> validateProduct(BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();

        if (bindingResult.hasErrors()) {
            return errorMap;
        }
        return null;
    }

    public Long checkProductType(String productType) {
        Long productTypeId;
        switch (productType) {
            case "fullface":
            case "1":
                productTypeId = 1L;
                break;
            case "3/4":
            case "2":
                productTypeId = 2L;
                break;
            case "armor":
            case "3":
                productTypeId = 3L;
                break;
            case "glove":
            case "4":
                productTypeId = 4L;
                break;
            case "shoe":
            case "5":
                productTypeId = 5L;
                break;
            case "barrel":
            case "6":
                productTypeId = 6L;
                break;
            default:
                productTypeId = null;
        }
        return productTypeId;
    }
}
