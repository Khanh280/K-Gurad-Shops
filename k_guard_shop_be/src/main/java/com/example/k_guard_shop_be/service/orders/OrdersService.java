package com.example.k_guard_shop_be.service.orders;

import com.example.k_guard_shop_be.controller.CustomerRestController;
import com.example.k_guard_shop_be.model.*;
import com.example.k_guard_shop_be.repository.IOrderDetailRepository;
import com.example.k_guard_shop_be.repository.IOrdersRepository;
import com.example.k_guard_shop_be.repository.IProductRepository;
import com.example.k_guard_shop_be.repository.IProductTypeRepository;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Transactional
    @Override
    public void saveOrder(HttpServletRequest httpServletRequest) throws RuntimeException {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        Orders orders = new Orders(customer);
        iOrdersRepository.save(orders);
        List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (int i = 0; i < shoppingCartList.size(); i++) {
            Product product = shoppingCartList.get(i).getProductSize().getProduct();
            ShoppingCart shoppingCart = shoppingCartList.get(i);
            if (shoppingCartList.get(i).getQuantity() <= product.getQuantity()) {
                product.setQuantity(product.getQuantity() - shoppingCartList.get(i).getQuantity());
                OrderDetail orderDetail = new OrderDetail(orders, shoppingCartList.get(i).getProductSize().getProduct(), shoppingCartList.get(i).getProductSize().getProduct().getPrice(), shoppingCartList.get(i).getQuantity());
                orderDetailList.add(orderDetail);
                iProductRepository.save(product);
                shoppingCart.setDelete(true);
                iShoppingCartService.saveShoppingCart(shoppingCart, httpServletRequest);
            }
        }
        iOrderDetailRepository.saveAll(orderDetailList);
    }
}
