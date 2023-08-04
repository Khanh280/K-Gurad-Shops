package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.dto.ProductDTO;
import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.model.Product;
import com.example.k_guard_shop_be.service.product.IImageService;
import com.example.k_guard_shop_be.service.product.IProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class ProductRestController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IImageService iImageService;

    @GetMapping("")
    public ResponseEntity<Page<IProductDTO>> getAllProduct(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 8);
        Page<IProductDTO> productPage = iProductService.getAll(pageable);
        if (productPage.getTotalElements() == 0 || productPage.getContent().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @PostMapping("")
    @Transactional
    public ResponseEntity<?> saveProduct(@Validated @RequestBody ProductDTO productDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        iProductService.saveProduct(product);

        List<Images> imagesList = new ArrayList<>();
        for (Images i : productDTO.getImage()) {
            imagesList.add(new Images(i.getId(),product, i.getLink()));
        }
        iImageService.saveImage(imagesList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteProduct(@RequestBody String id) {
        iProductService.deleteProduct(Long.parseLong(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/product-detail")
    public ResponseEntity<?> getProduct(@RequestBody String id) {
        Product product = iProductService.getProductById(Long.parseLong(id));
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Map<Product,List<Images>> productImagesMap = new HashMap<>();
        List<Images> imagesList = iImageService.getAllByProductId(Long.parseLong(id));
        productImagesMap.put(product,imagesList);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> error(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NOT FOUND");
    }
}
