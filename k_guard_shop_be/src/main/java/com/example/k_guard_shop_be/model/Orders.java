package com.example.k_guard_shop_be.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "customer_id")
    @ManyToOne
    private Customer customer;
    @CreationTimestamp
    @Column(nullable = false,updatable = false,columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime createDate;

    public Orders() {
    }

    public Orders(Customer customer) {
        this.customer = customer;
    }

    public Orders(Long id, Customer customer, LocalDateTime createDate) {
        this.id = id;
        this.customer = customer;
        this.createDate = createDate;
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

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }
}
