package com.example.k_guard_shop_be.service.cart;

import com.example.k_guard_shop_be.controller.CustomerRestController;
import com.example.k_guard_shop_be.model.*;
import com.example.k_guard_shop_be.repository.IShoppingCartRepository;
import com.example.k_guard_shop_be.service.IProductSizeService;
import com.example.k_guard_shop_be.service.brand.IBrandService;
import com.example.k_guard_shop_be.service.product.IProductService;
import com.example.k_guard_shop_be.service.product_type.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingCartService implements IShoppingCartService {
    @Autowired
    private IShoppingCartRepository iShoppingCartRepository;
    @Autowired
    private IBrandService iBrandService;
    @Autowired
    private IProductTypeService iProductTypeService;
    @Autowired
    private CustomerRestController customerRestController;
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IProductSizeService iProductSizeService;

    @Override
    public ResponseEntity<?> saveShoppingCartSession(ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        HttpSession session = httpServletRequest.getSession();
        Brand brand = iBrandService.getBrandByProductId(shoppingCart.getProductSize().getProduct().getId());
        ProductType productType = iProductTypeService.getProductTypeByProductId(shoppingCart.getProductSize().getProduct().getId());
        shoppingCart.getProductSize().getProduct().setBrand(brand);
        shoppingCart.getProductSize().getProduct().setProductType(productType);
        if (session.getAttribute("cart") != null) {
            shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
            int count = 0;
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCartList.get(i).getProductSize().getId() == shoppingCart.getProductSize().getId()
                        && shoppingCart.getProductSize().getProduct().getId() == shoppingCartList.get(i).getProductSize().getProduct().getId()) {
                    if (shoppingCartList.get(i).getQuantity() + shoppingCart.getQuantity() > shoppingCart.getProductSize().getProduct().getQuantity()) {
                        return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.BAD_REQUEST);
                    }
                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + shoppingCart.getQuantity());
                    count++;
                }
            }
            if (count == 0) {
                if (shoppingCart.getQuantity() > shoppingCart.getProductSize().getProduct().getQuantity()) {
                    return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.BAD_REQUEST);
                }
                shoppingCartList.add(shoppingCart);
            }
        } else {
            session.setAttribute("cart", shoppingCartList);
            if (shoppingCart.getQuantity() > shoppingCart.getProductSize().getProduct().getQuantity()) {
                return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.BAD_REQUEST);
            }
            shoppingCartList.add(shoppingCart);
        }
        session.setAttribute("cart", shoppingCartList);
        return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> saveShoppingCart(ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        if (customer != null) {
            List<ShoppingCart> shoppingCartList = iShoppingCartRepository.getAll(customer.getId());
            ShoppingCart newShoppingCart = new ShoppingCart();
            int count = 0;
            for (int i = 0; i < shoppingCartList.size(); i++) {
//                if (shoppingCartList.get(i).getProductSize().getProduct().getId() == shoppingCart.getProductSize().getProduct().getId() &&
//                        shoppingCart.getProductSize().getSizes().getId() == shoppingCartList.get(i).getProductSize().getSizes().getId()) {
                if (shoppingCartList.get(i).getProductSize().getId() == shoppingCart.getProductSize().getId() &&
                        shoppingCartList.get(i).getProductSize().getProduct().getId() == shoppingCart.getProductSize().getProduct().getId()) {
                    newShoppingCart = shoppingCartList.get(i);
                    if (newShoppingCart.getQuantity() + shoppingCart.getQuantity() > shoppingCart.getProductSize().getProduct().getQuantity()) {
                        return new ResponseEntity<>(iShoppingCartRepository.getAll(customer.getId()), HttpStatus.BAD_REQUEST);
                    }
                    newShoppingCart.setQuantity(newShoppingCart.getQuantity() + shoppingCart.getQuantity());
                    count++;
                    break;
                }
            }
            if (count == 0) {
                if (shoppingCart.getQuantity() > shoppingCart.getProductSize().getProduct().getQuantity()) {
                    return new ResponseEntity<>(iShoppingCartRepository.getAll(customer.getId()), HttpStatus.BAD_REQUEST);
                }
                shoppingCart.setCustomer(customer);
                iShoppingCartRepository.save(shoppingCart);
            } else {
                iShoppingCartRepository.save(newShoppingCart);
            }
        } else {
            return null;
        }
        return new ResponseEntity<>(iShoppingCartRepository.getAll(customer.getId()), HttpStatus.OK);
//        return iShoppingCartRepository.getAll(customer.getId());
//        iShoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ResponseEntity<?> updateShoppingCart(String operator, Long id, String isLogin, HttpServletRequest httpServletRequest) {
        Product product;
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        Integer sign = 0;
        switch (operator) {
            case "minus":
                sign = -1;
                break;
            case "plus":
                sign = 1;
                break;
            default:
                sign = 0;
        }
        if (isLogin.equals("true")) {
            ShoppingCart shoppingCart = iShoppingCartRepository.getCartById(id);
            product = iProductService.getProductById(shoppingCart.getProductSize().getProduct().getId());
            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
            if (shoppingCart.getQuantity() + sign > product.getQuantity()) {
                return new ResponseEntity<>(iShoppingCartRepository.getAll(customer.getId()), HttpStatus.BAD_REQUEST);
            }
            shoppingCart.setQuantity(shoppingCart.getQuantity() + sign);
            if (shoppingCart.getQuantity() == 0) {
                iShoppingCartRepository.deleteCart(shoppingCart.getId(), customer.getId());
            } else {
                iShoppingCartRepository.save(shoppingCart);
            }
            return new ResponseEntity<>(iShoppingCartRepository.getAll(customer.getId()), HttpStatus.OK);
        } else {
            if (shoppingCartList != null) {
                ProductSize productSize = iProductSizeService.getProductSizeById(id);
                product = iProductService.getProductById(productSize.getProduct().getId());
                for (int i = 0; i < shoppingCartList.size(); i++) {
                    if (shoppingCartList.get(i).getProductSize().getId() == id) {
                        if (shoppingCartList.get(i).getQuantity() + sign > product.getQuantity()) {
                            return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.BAD_REQUEST);
                        }
                        shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + sign);
                        if (shoppingCartList.get(i).getQuantity() == 0) {
                            shoppingCartList.remove(shoppingCartList.get(i));
                        }
                    }
                }
            }
            session.setAttribute("cart", shoppingCartList);
            return new ResponseEntity<>(session.getAttribute("cart"), HttpStatus.OK);
        }
    }

    @Override
    public List<ShoppingCart> deleteCartSession(Long productId, HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        if (shoppingCartList != null) {
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCartList.get(i).getProductSize().getProduct().getId() == productId) {
                    shoppingCartList.remove(shoppingCartList.get(i));
                    break;
                }
            }
        } else {
            return null;
        }
        session.setAttribute("cart", shoppingCartList);
        return (List<ShoppingCart>) session.getAttribute("cart");
    }

    @Override
    public List<ShoppingCart> getAll(Long customerId) {
        return iShoppingCartRepository.getAll(customerId);
    }

    @Override
    public ResponseEntity<?> showShoppingCart(HttpServletRequest httpServletRequest) {
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        HttpSession session = httpServletRequest.getSession();
        if (session.getAttribute("cart") != null) {
            List<ShoppingCart> cartSession = (List<ShoppingCart>) session.getAttribute("cart");
            for (int i = 0; i < cartSession.size(); i++) {
                ShoppingCart newCart = new ShoppingCart();
                ShoppingCart cartDuplicate = iShoppingCartRepository.getCartByCustomerIdAndProductId(customer.getId(), cartSession.get(i).getProductSize().getProduct().getId());
                if (cartDuplicate.getQuantity() > cartSession.get(i).getProductSize().getProduct().getQuantity()) {
                    return new ResponseEntity<>(iShoppingCartRepository.getAll(customer.getId()), HttpStatus.BAD_REQUEST);
                }
                if (cartDuplicate != null) {
                    cartDuplicate.setQuantity(cartSession.get(i).getQuantity() + cartDuplicate.getQuantity());
                    iShoppingCartRepository.save(cartDuplicate);
                } else {
                    newCart.setCustomer(customer);
                    newCart.getProductSize().setProduct(cartSession.get(i).getProductSize().getProduct());
                    newCart.setQuantity(cartSession.get(i).getQuantity());
                    newCart.setImage(cartSession.get(i).getImage());
                    shoppingCartList.add(newCart);
                    iShoppingCartRepository.save(newCart);
                }
            }
            session.removeAttribute("cart");
        }
        if (customer != null) {
            shoppingCartList = iShoppingCartRepository.getAll(customer.getId());
        }
        return new ResponseEntity<>(shoppingCartList, HttpStatus.OK);
    }

    @Override
    public void saveAllShoppingCart(ShoppingCart shoppingCart) {

        iShoppingCartRepository.save(shoppingCart);

    }

    @Override
    public void deleteCartByCustomerId(Long cartId, Long customerId) {
        iShoppingCartRepository.deleteCart(cartId, customerId);
    }

    @Override
    public ShoppingCart getShoppingCartById(Long cartId) {
        return iShoppingCartRepository.getCartById(cartId);
    }

    @Override
    public ShoppingCart getShoppingCartByCustomerIdAndProductId(Long customerId, Long productId) {
        return iShoppingCartRepository.getCartByCustomerIdAndProductId(customerId, productId);
    }
}
