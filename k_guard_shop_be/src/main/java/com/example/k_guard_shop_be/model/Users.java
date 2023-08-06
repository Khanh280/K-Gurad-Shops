package com.example.k_guard_shop_be.model;

import javax.persistence.*;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username", nullable = false,unique = true)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    private String verifyCode;
    @ManyToOne
    @JoinColumn(name = "roles_id")
    private Roles roles;

    public Users() {
    }

    public Users(Long id, String username, String password, String verifyCode, Roles roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.verifyCode = verifyCode;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public Roles getRoles() {
        return roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }
}
