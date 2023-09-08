package com.example.k_guard_shop_be.service.orders;

import com.example.k_guard_shop_be.controller.CustomerRestController;
import com.example.k_guard_shop_be.dto.OrderDTO;
import com.example.k_guard_shop_be.dto.OrderDetailDTO;
import com.example.k_guard_shop_be.model.*;
import com.example.k_guard_shop_be.repository.IOrderDetailRepository;
import com.example.k_guard_shop_be.repository.IOrdersRepository;
import com.example.k_guard_shop_be.repository.IProductRepository;
import com.example.k_guard_shop_be.repository.IProductTypeRepository;
import com.example.k_guard_shop_be.service.IProductSizeService;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrdersService implements IOrdersService {
    @Autowired
    private IOrdersRepository iOrdersRepository;
    @Autowired
    private CustomerRestController customerRestController;
    @Autowired
    private IShoppingCartService iShoppingCartService;
    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;
    @Autowired
    private IProductRepository iProductRepository;
    @Autowired
    private IProductSizeService iProductSizeService;

    @Override
    public Page<OrderDTO> getAllOrderCustomer(HttpServletRequest httpServletRequest, Pageable pageable) {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        return iOrdersRepository.getAllOrderCustomer(customer.getId(), pageable);
    }

    @Transactional
    @Override
    public List<OrderDetail> saveOrder(HttpServletRequest httpServletRequest, String payment) throws RuntimeException {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        PaymentStatus paymentStatus = new PaymentStatus();
        switch (payment) {
            case "true":
                paymentStatus.setId(2L);
                break;
            case "false":
                paymentStatus.setId(1L);
            default:
                paymentStatus.setId(1L);
        }
        Orders orders = new Orders(customer, paymentStatus);
        iOrdersRepository.save(orders);
        List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (int i = 0; i < shoppingCartList.size(); i++) {
            Product product = shoppingCartList.get(i).getProductSize().getProduct();
            ShoppingCart shoppingCart = shoppingCartList.get(i);
            if (shoppingCartList.get(i).getQuantity() <= product.getQuantity()) {
                product.setQuantity(product.getQuantity() - shoppingCartList.get(i).getQuantity());
                OrderDetail orderDetail = new OrderDetail(orders, shoppingCartList.get(i).getProductSize(),
                        shoppingCartList.get(i).getProductSize().getProduct().getPrice(), shoppingCartList.get(i).getQuantity());
                orderDetailList.add(orderDetail);
                iProductRepository.save(product);
                shoppingCart.setDelete(true);
                iShoppingCartService.saveShoppingCart(shoppingCart, httpServletRequest);
            }
        }
        iOrderDetailRepository.saveAll(orderDetailList);
        return orderDetailList;
    }

    @Override
    public Page<OrderDTO> getAll(Pageable pageable) {
        return iOrdersRepository.getAllOrder(pageable);
    }

    @Override
    public Page<OrderDetailDTO> getOrderDetail(Long orderId, Pageable pageable) {
        System.out.println(orderId);
        return iOrderDetailRepository.getOrderDetail(orderId,pageable);
    }
}
