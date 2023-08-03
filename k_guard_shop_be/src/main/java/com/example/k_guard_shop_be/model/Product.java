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
    private String name;
    private Long price;
    private String description;
    @JoinColumn
    @ManyToOne
    private Sizes sizes;
    @JoinColumn
    @ManyToOne
    private ProductType productType;
    @CreationTimestamp
    @JoinColumn(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime createDate;
    @UpdateTimestamp
    @JoinColumn(nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime updateDate;
    private Integer quantity;
    @JoinColumn(columnDefinition = "DEFAULT BIT(0)")
    private boolean isDelete;

    public Product() {
    }

    public Product(Long id, String name, Long price, String description, Sizes sizes, ProductType productType, LocalDateTime createDate, LocalDateTime updateDate, Integer quantity, boolean isDelete) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.sizes = sizes;
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

    public Sizes getSizes() {
        return sizes;
    }

    public void setSizes(Sizes sizes) {
        this.sizes = sizes;
    }

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
}
