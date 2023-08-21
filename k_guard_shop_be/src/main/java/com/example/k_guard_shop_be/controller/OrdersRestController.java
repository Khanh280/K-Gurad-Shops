package com.example.k_guard_shop_be.controller;

import com.example.k_guard_shop_be.dto.OrderDTO;
import com.example.k_guard_shop_be.dto.OrderDetailDTO;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.OrderDetail;
import com.example.k_guard_shop_be.model.Orders;
import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.service.EmailServive;
import com.example.k_guard_shop_be.service.cart.IShoppingCartService;
import com.example.k_guard_shop_be.service.order_detail.IOrderDetailService;
import com.example.k_guard_shop_be.service.orders.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    @Autowired
    private IOrderDetailService iOrderDetailService;

    @GetMapping("/order-detail-customer")
    public ResponseEntity<?> getAllOrderDetailCustomer(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                 HttpServletRequest httpServletRequest) {
        Pageable pageable = PageRequest.of(page,8);
        Page<OrderDetailDTO> orderDetailPage = iOrderDetailService.getAllOrderDetailCustomer(httpServletRequest,pageable);
        return new ResponseEntity<>(orderDetailPage,HttpStatus.OK);
    }
    @GetMapping("/order-customer")
    public ResponseEntity<?> getAllOrderCustomer(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                 HttpServletRequest httpServletRequest) {
        Pageable pageable = PageRequest.of(page,8);
        Page<OrderDTO> orderDTOPage = iOrdersService.getAllOrderCustomer(httpServletRequest,pageable);
        return new ResponseEntity<>(orderDTOPage,HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> saveOrders(HttpServletRequest httpServletRequest) {
        try {
            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
//            List<OrderDetail> orderDetailList = iOrdersService.saveOrder(httpServletRequest);
            List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
            String to = customer.getEmail();
            String subject = "Bạn có đơn hàng từ K-Guard Shop";
            String body = "<h6>Chào " + customer.getName() + ",</p>\n" +
                    "\n" +
                    "<p>Chúng tôi gửi mail này để xác nhận rằng bạn vừa thanh toán một đơn hàng thành công từ K-Guard Shop </p>\n" +
                    "\n" +
                    "<p>Dưới đây là chi tiết hóa đơn của bạn:</p>\n";
            String table = "<table>";
            table += "<tr>" +
                    "<th>Sản phẩm</th>" + "<th>Size</th>" + "<th>Số lượng</th>" + "<th>Giá tiền</th>" +
                    "</tr>";
            for (int i = 0; i < shoppingCartList.size(); i++) {
                table += "<tr>" +
                        "<td style='display: flex'>" +
//                        "<img src='" + shoppingCartList.get(i).getImage() + "' style='width: 10rem'>" +
                        "<p' >" + shoppingCartList.get(i).getProductSize().getProduct().getName() + "</p>" +
                        "</td>" +
                        "<td>" + shoppingCartList.get(i).getProductSize().getSizes().getName() + "</td>" +
                        "<td>" + shoppingCartList.get(i).getQuantity() + "</td>" +
                        "<td>" + shoppingCartList.get(i).getProductSize().getProduct().getPrice() + "</td>" +
                        "</tr>";
            }
            table += "</table>";
            body += table;
            body += "\nChúng tôi xin cảm ơn quý khách đã tin tường và sử dụng dịch vụ của chúng tôi.\n" +
                    "---------------------------------------" + "\n" +
                    "Name: K-Guard Shop\n" +
                    "Mobile: 0338410349\n" +
                    "Email: kguardshop28@gmail.com\n" +
                    "Address: 02 An Lương, Duy Hải, Duy Xuyên, Quảng Nam";
            System.out.println(body);
            emailServive.sendMail(to, subject, body);
            return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
