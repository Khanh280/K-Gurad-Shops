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
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllOrder(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<OrderDTO> orderDTOPage = iOrdersService.getAll(pageable);
        return new ResponseEntity<>(orderDTOPage,HttpStatus.OK);
    }

    @GetMapping("/order-detail-customer")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> getAllOrderDetailCustomer(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                       @RequestParam(value = "orderId", defaultValue = "") Long orderId,
                                                       HttpServletRequest httpServletRequest) {
        Pageable pageable = PageRequest.of(page, 8);
        Page<OrderDetailDTO> orderDetailPage = iOrderDetailService.getAllOrderDetailCustomer(httpServletRequest, orderId, pageable);
        return new ResponseEntity<>(orderDetailPage, HttpStatus.OK);
    }

    @GetMapping("/order-customer")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> getAllOrderCustomer(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                 HttpServletRequest httpServletRequest) {
        Sort sort = Sort.by("createDate").descending();
        Pageable pageable = PageRequest.of(page, 8, sort);
        Page<OrderDTO> orderDTOPage = iOrdersService.getAllOrderCustomer(httpServletRequest, pageable);
        return new ResponseEntity<>(orderDTOPage, HttpStatus.OK);
    }
    @GetMapping("/order-detail")
    public ResponseEntity<?> detailOrder(@RequestParam("orderId")Long orderId,@RequestParam(value = "page",defaultValue = "0")Integer page){
        Pageable pageable = PageRequest.of(page,10);
        Page<OrderDetailDTO> orderDetailPage = iOrdersService.getOrderDetail(orderId,pageable);
        return new ResponseEntity<>(orderDetailPage,HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> saveOrders(@RequestBody String payment, HttpServletRequest httpServletRequest) {
        try {
            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
            List<OrderDetail> orderDetailList = iOrdersService.saveOrder(httpServletRequest, payment);
            List<ShoppingCart> shoppingCartList = iShoppingCartService.getAll(customer.getId());
            if (orderDetailList.size() == 0) {
                return new ResponseEntity<>(shoppingCartList, HttpStatus.BAD_REQUEST);
            }
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
            Long totalPrice = 0L;
            for (int i = 0; i < orderDetailList.size(); i++) {
                totalPrice += orderDetailList.get(i).getPrice() * orderDetailList.get(i).getQuantity();
                table += "<tr>" +
                        "<td style='display: flex'>" +
                        "<p' >" + orderDetailList.get(i).getProductSize().getProduct().getName() + "</p>" +
                        "</td>" +
                        "<td>" + orderDetailList.get(i).getProductSize().getSizes().getName() + "</td>" +
                        "<td>" + orderDetailList.get(i).getQuantity() + "</td>" +
                        "<td>" + orderDetailList.get(i).getProductSize().getProduct().getPrice() + "</td>" +
                        "</tr>";
            }
            table += "<p>Tổng tiền đơn hàng:" + totalPrice + "</p>";
            table += "</table>";
            body += table;
            body += "<p>Chúng tôi xin cảm ơn quý khách đã tin tường và sử dụng dịch vụ của chúng tôi.</p>" +
                    "<p>---------------------------------------</p>" +
                    "<p>Name: K-Guard Shop</p>" +
                    "<p>Mobile: 0338410349</p>" +
                    "<p>Email: kguardshop28@gmail.com</p>" +
                    "<p>Address: 02 An Lương, Duy Hải, Duy Xuyên, Quảng Nam</p>";
//            System.out.println(body);
            emailServive.sendMail(to, subject, body);
            return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
