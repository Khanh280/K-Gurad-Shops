package com.example.k_guard_shop_be.model;

import javax.persistence.*;

@Entity
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name = "size_id",nullable = false)
    private Sizes sizes;

    public ProductSize() {
    }

    public ProductSize(Long id, Product product, Sizes sizes) {
        this.id = id;
        this.product = product;
        this.sizes = sizes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Sizes getSizes() {
        return sizes;
    }

    public void setSizes(Sizes sizes) {
        this.sizes = sizes;
    }
}
