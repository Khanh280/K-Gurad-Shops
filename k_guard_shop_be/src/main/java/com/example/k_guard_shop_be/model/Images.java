package com.example.k_guard_shop_be.model;

import javax.persistence.*;

@Entity
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "product_id")
    @ManyToOne
    private Product product;
    @Column(name = "link", nullable = false)
    private String link;

    public Images() {
    }

    public Images(Product product, String link) {
        this.product = product;
        this.link = link;
    }

    public Images(Long id, Product product, String link) {
        this.id = id;
        this.product = product;
        this.link = link;
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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
