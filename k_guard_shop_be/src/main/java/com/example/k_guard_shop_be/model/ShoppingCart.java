package com.example.k_guard_shop_be.model;

import javax.persistence.*;

@Entity
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn
    @ManyToOne
    private Customer customer;
    @JoinColumn
    @ManyToOne
    private Product product;
    private Integer quantity;
    private boolean isDelete;
}
