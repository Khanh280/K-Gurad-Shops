package com.example.k_guard_shop_be.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name",nullable = false,columnDefinition = "VARCHAR(150)")
    private String name;
    @Column(name = "price",nullable = false)
    private Long price;
    @Column(name = "description",nullable = false,columnDefinition = "TEXT")
    private String description;
//    @JoinColumn(name = "sizes_id")
//    @ManyToOne
//    private Sizes sizes;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    @JoinColumn(name = "product_type_id")
    @ManyToOne
    private ProductType productType;
    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime createDate;
    @UpdateTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime updateDate;
    @Column(name = "quantity",nullable = false)
    private Integer quantity;
    @Column(name = "is_delete",columnDefinition = "BIT(1) DEFAULT 0")
    private boolean isDelete;

    public Product() {
    }

    public Product(Long id, String name, Long price, String description, Brand brand, ProductType productType, LocalDateTime createDate, LocalDateTime updateDate, Integer quantity, boolean isDelete) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.brand = brand;
        this.productType = productType;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.quantity = quantity;
        this.isDelete = isDelete;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public Sizes getSizes() {
//        return sizes;
//    }
//
//    public void setSizes(Sizes sizes) {
//        this.sizes = sizes;
//    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
}
