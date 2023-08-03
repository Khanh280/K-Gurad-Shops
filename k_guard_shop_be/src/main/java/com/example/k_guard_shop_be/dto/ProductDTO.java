package com.example.k_guard_shop_be.dto;

import com.example.k_guard_shop_be.model.ProductType;
import com.example.k_guard_shop_be.model.Sizes;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class ProductDTO {
    private Long id;

    private String name;
    private Long price;
    private String description;

    private Sizes sizes;

    private ProductType productType;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;
    private Integer quantity;
    private boolean isDelete;
    @NotNull(message = "Khong duoc de trong")
    @Size(min = 1,message = "It nhat 1 anh")
    private List<String> image;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String name, Long price, String description, Sizes sizes, ProductType productType, LocalDateTime createDate, LocalDateTime updateDate, Integer quantity, boolean isDelete, List<String> image) {
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
        this.image = image;
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

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }
}
