package com.example.k_guard_shop_be.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "orders_id")
    @ManyToOne
    private Orders orders;
    @JoinColumn(name = "product_size_id")
    @ManyToOne
    private ProductSize productSize;
    @Column(name = "price", nullable = false)
    private Long price;
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime createDate;
    @UpdateTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime updateDate;
    @Column(name = "is_delete", columnDefinition = "BIT(1) DEFAULT 0")
    private boolean isDelete;

    public OrderDetail() {
    }

//    public OrderDetail(Orders orders, Product product, Long price, Integer quantity) {
//        this.orders = orders;
//        this.product = product;
//        this.price = price;
//        this.quantity = quantity;
//    }


    public OrderDetail(Orders orders, ProductSize productSize, Long price, Integer quantity) {
        this.orders = orders;
        this.productSize = productSize;
        this.price = price;
        this.quantity = quantity;
    }

    public OrderDetail(Long id, Orders orders, ProductSize productSize, Long price, Integer quantity, LocalDateTime createDate, LocalDateTime updateDate, boolean isDelete) {
        this.id = id;
        this.orders = orders;
        this.productSize = productSize;
        this.price = price;
        this.quantity = quantity;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.isDelete = isDelete;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

//    public Product getProduct() {
//        return product;
//    }
//
//    public void setProduct(Product product) {
//        this.product = product;
//    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public ProductSize getProductSize() {
        return productSize;
    }

    public void setProductSize(ProductSize productSize) {
        this.productSize = productSize;
    }
}
