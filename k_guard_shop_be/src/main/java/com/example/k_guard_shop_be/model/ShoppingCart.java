package com.example.k_guard_shop_be.model;

import javax.persistence.*;

@Entity
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name="customer")
    @ManyToOne
    private Customer customer;
    @JoinColumn(name = "product")
    @ManyToOne
    private Product product;
    @Column(name = "quantity",nullable = false)
    private Integer quantity;
    @Column(name = "is_delete",columnDefinition = "DEFAULT BIT(0)")
    private boolean isDelete;

    public ShoppingCart() {
    }

    public ShoppingCart(Long id, Customer customer, Product product, Integer quantity, boolean isDelete) {
        this.id = id;
        this.customer = customer;
        this.product = product;
        this.quantity = quantity;
        this.isDelete = isDelete;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
