package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.IProductDTO;
import com.example.k_guard_shop_be.dto.ProductDTO;
import com.example.k_guard_shop_be.dto.ProductDTOPlus;
import com.example.k_guard_shop_be.model.Brand;
import com.example.k_guard_shop_be.model.Images;
import com.example.k_guard_shop_be.model.Product;
import com.example.k_guard_shop_be.model.ProductType;
import com.example.k_guard_shop_be.repository.IProductTypeRepository;
import com.example.k_guard_shop_be.service.brand.IBrandService;
import com.example.k_guard_shop_be.service.product.IImageService;
import com.example.k_guard_shop_be.service.product.IProductService;
import com.example.k_guard_shop_be.service.product_type.IProductTypeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @Autowired
    private IProductTypeService iProductTypeService;
    @Autowired
    private IBrandService iBrandService;

    @GetMapping("")
    public ResponseEntity<Page<IProductDTO>> getAllProduct(@RequestParam(value = "nameSearch", defaultValue = "") String nameSearch,
                                                           @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                           @RequestParam(value = "productType", defaultValue = "") String productType,
                                                           @RequestParam(value = "brand", defaultValue = "") Long brand,
                                                           @RequestParam(value = "orderBy", defaultValue = "0") String orderBy
    ) {
        Sort sort = checkOrderBy(orderBy);
        Pageable pageable = PageRequest.of(page, 8, sort);
        Page<IProductDTO> productPage;
        productPage = iProductService.getAll(pageable, productType, brand, nameSearch);
        if (productPage.getTotalElements() == 0 || productPage.getContent().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/product-manager")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<IProductDTO>> getAllProductManager(@RequestParam(value = "nameSearch", defaultValue = "") String nameSearch,
                                                                  @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                                  @RequestParam(value = "productType", defaultValue = "") String productType,
                                                                  @RequestParam(value = "brand", defaultValue = "") Long brand,
                                                                  @RequestParam(value = "orderBy", defaultValue = "0") String orderBy
    ) {
        Sort sort = checkOrderBy(orderBy);
        Pageable pageable = PageRequest.of(page, 4, sort);
        Page<IProductDTO> productPage;
        productPage = iProductService.getAll(pageable, productType, brand, nameSearch);
        if (productPage.getTotalElements() == 0 || productPage.getContent().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/top-product/{quantity}")
    public ResponseEntity<List<IProductDTO>> getTopProduct(@PathVariable("quantity") Integer quantity) {
        List<IProductDTO> productPage = iProductService.getTopProduct(quantity);
        if (productPage.size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/product-type")
    public ResponseEntity<?> getProductType() {
        List<ProductType> productTypeList = iProductTypeService.getAll();
        return new ResponseEntity<>(productTypeList, HttpStatus.OK);
    }

    @GetMapping("/brand")
    public ResponseEntity<?> getbrand() {
        List<Brand> brandList = iBrandService.getAll();
        return new ResponseEntity<>(brandList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProduct(@RequestParam(value = "name", defaultValue = "") String name,
                                           @RequestParam(value = "page", defaultValue = "0") Integer page,
                                           @RequestParam(value = "productType", defaultValue = "") String productType,
                                           @RequestParam(value = "brand", defaultValue = "") Long brand,
                                           @RequestParam(value = "orderBy", defaultValue = "0") String orderBy) {
        Sort sort = checkOrderBy(orderBy);
        Pageable pageable = PageRequest.of(page, 8, sort);
        Page<IProductDTO> iProductDTO = iProductService.searchByName(pageable, name, productType, brand);
        return new ResponseEntity<>(iProductDTO, HttpStatus.OK);
    }

    @PostMapping("")
//    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> saveProduct(@Validated @RequestBody ProductDTOPlus productDTOPlus, BindingResult bindingResult) {
        Map<String, String> errorMap = iProductService.validateProduct(bindingResult);
        if(errorMap != null){
            return new ResponseEntity<>(errorMap,HttpStatus.BAD_REQUEST);
        }
        iProductService.saveProduct(productDTOPlus);
//        Product product = new Product();
//        BeanUtils.copyProperties(productDTOPlus, product);
//        iProductService.saveProduct(product);
//        List<Images> imagesList = new ArrayList<>();
//        for (Images i : productDTOPlus.getImage()) {
//            imagesList.add(new Images(i.getId(), product, i.getLink()));
//        }
//        iImageService.saveImage(imagesList);
        System.out.println(productDTOPlus);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        iProductService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/detail")
    public ResponseEntity<?> getProductById(@RequestBody String id) {
        Product product = iProductService.getProductById(Long.parseLong(id));
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Images> imagesList = iImageService.getAllByProductId(Long.parseLong(id));
        return new ResponseEntity<>(imagesList, HttpStatus.OK);
    }

    @GetMapping("/size/{productId}")
    public ResponseEntity<?> getSizeProduct(@PathVariable("productId") Long productId) {
        return new ResponseEntity<>(iProductService.getAllSize(productId), HttpStatus.OK);
    }
    @GetMapping("/size")
    public ResponseEntity<?> getSizeProduct() {
        return new ResponseEntity<>(iProductService.getAllSize(), HttpStatus.OK);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> error(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("NOT FOUND");
    }

    public Sort checkOrderBy(String orderBy) {
        Sort sort;
        switch (orderBy) {
            case "new":
                sort = Sort.by("id").descending();
                break;
            case "a-z":
                sort = Sort.by("name").ascending();
                break;
            case "priceAscending":
                sort = Sort.by("price").ascending();
                break;
            case "priceDescending":
                sort = Sort.by("price").descending();
                break;
            default:
                sort = Sort.by("id").descending();
                break;
        }
        return sort;
    }
}
