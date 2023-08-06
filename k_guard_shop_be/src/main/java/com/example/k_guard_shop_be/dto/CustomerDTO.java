package com.example.k_guard_shop_be.dto;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class CustomerDTO {
    private Long id;
    @NotBlank(message = "Tên không được để trống")
    @Pattern(regexp = "^(\\s)*[A-Z][a-z]*(\\s)*([A-Z][a-z]*(\\s)*)*([A-Z][a-z]*(\\s)*)$",message = "Tên không được chứa số, ký tự đặc biệt như @,#,$... VD: Kieu Quoc Khanh")
    private String name;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(\\+84)[0-9]{9}|0[0-9]{9}$",message= "Số điện thoại không đúng định dạng")
    private String phoneNumber;
    @NotNull(message = "Vui lòng chọn giới tính hợp lệ")
    @Min(value = 0,message = "Vui lòng chọn giới tính hợp lệ")
    private Integer gender;
    @Valid
    private UserDTO userDTO;
    @NotBlank(message = "Email không được để trống")
    @Email(message="Email không hợp lệ. VD: kguarshop@gmail.com")
    private String email;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private boolean isDelete;

    public CustomerDTO() {
    }

    public CustomerDTO(Long id, String name, String address, String phoneNumber, Integer gender, UserDTO userDTO, String email, LocalDateTime createDate, LocalDateTime updateDate, boolean isDelete) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.userDTO = userDTO;
        this.email = email;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
