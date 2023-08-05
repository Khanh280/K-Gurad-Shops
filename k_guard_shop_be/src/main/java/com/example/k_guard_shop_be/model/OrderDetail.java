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
    @JoinColumn(name = "orders")
    @ManyToOne
    private Orders orders;
    @JoinColumn(name="product")
    @ManyToOne
    private Product product;
    @Column(name = "price", nullable = false)
    private Long price;
    @JoinColumn(name = "quantity",nullable = false)
    private Integer quantity;
    @CreationTimestamp
    @JoinColumn(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime createDate;
    @UpdateTimestamp
    @JoinColumn(nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime updateDate;
    @Column(name = "is_delete",columnDefinition = "DEFAULT BIT(0)")
    private boolean isDelete;

    public OrderDetail() {
    }

    public OrderDetail(Long id, Orders orders, Product product, Long price, Integer quantity, LocalDateTime createDate, LocalDateTime updateDate, boolean isDelete) {
        this.id = id;
        this.orders = orders;
        this.product = product;
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

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
}
