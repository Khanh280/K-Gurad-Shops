package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.service.EmailServive;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import com.example.k_guard_shop_be.service.orders.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrdersRestController {
    @Autowired
    private IOrdersService iOrdersService;
    @Autowired
    private IShoppingCartService iShoppingCartService;
    @Autowired
    private CustomerRestController customerRestController;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private EmailServive emailServive;

    @PostMapping("")
    public ResponseEntity<?> saveOrders(HttpServletRequest httpServletRequest) {
        try {
            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
            iOrdersService.saveOrder(httpServletRequest);
            List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());

            String to = customer.getEmail();
            String subject = "Bạn có đơn hàng từ K-Guard Shop";
            String body = "Chào " + customer.getName() + ",\n" +
                    "\n" +
                    "Chúng tôi gửi mail này để xác nhận rằng bạn vừa thanh toán một đơn hàng thành công từ K-Guard Shop \n" +
                    "\n" +
                    "Chúng tôi xin cảm ơn quý khách đã tin tường và sử dụng dịch vụ của chúng tôi.\n" +
                    "Dưới đây là chi tiết hóa đơn của bạn:\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "---------------------------------------" + "\n" +
                    "Name: K-Guard Shop\n" +
                    "Mobile: 0338410349\n" +
                    "Email: kguardshop28@gmail.com\n" +
                    "Address: 02 An Lương, Duy Hải, Duy Xuyên, Quảng Nam";
            emailServive.sendMail(to, subject, body);
            return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
