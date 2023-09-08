package com.example.k_guard_shop_be.dto;

public interface OrderDTO {
    String getId();
    String getCustomerName();
    String getCreateDate();
    String getTotalPrice();
    String getPaymentStatusId();
    String getPaymentStatus();
}
