package com.example.k_guard_shop_be.service.cart;

import com.example.k_guard_shop_be.controller.CustomerRestController;
import com.example.k_guard_shop_be.model.Brand;
import com.example.k_guard_shop_be.model.Customer;
import com.example.k_guard_shop_be.model.ProductType;
import com.example.k_guard_shop_be.model.ShoppingCart;
import com.example.k_guard_shop_be.repository.IShoppingCartRepository;
import com.example.k_guard_shop_be.service.brand.IBrandService;
import com.example.k_guard_shop_be.service.product_type.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    @Override
    public List<ShoppingCart> saveShoppingCartSession(ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        HttpSession session = httpServletRequest.getSession();
        Brand brand = iBrandService.getBrandByProductId(shoppingCart.getProduct().getId());
        ProductType productType = iProductTypeService.getProductTypeByProductId(shoppingCart.getProduct().getId());
        shoppingCart.getProduct().setBrand(brand);
        shoppingCart.getProduct().setProductType(productType);
        if (session.getAttribute("cart") != null) {
            shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
            int count = 0;
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCart.getProduct().getId() == shoppingCartList.get(i).getProduct().getId()) {
                    shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + shoppingCart.getQuantity());
                    count++;
                }
            }
            if (count == 0) {
                shoppingCartList.add(shoppingCart);
            }
        } else {
            session.setAttribute("cart", shoppingCartList);
            shoppingCartList.add(shoppingCart);
        }
        session.setAttribute("cart", shoppingCartList);
        return (List<ShoppingCart>) session.getAttribute("cart");
    }

    @Override
    public List<ShoppingCart> saveShoppingCart(ShoppingCart shoppingCart, HttpServletRequest httpServletRequest) {
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        if (customer != null) {
            List<ShoppingCart> shoppingCartList = iShoppingCartRepository.getAll(customer.getId());
            ShoppingCart newShoppingCart = new ShoppingCart();
            int count = 0;
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCartList.get(i).getProduct().getId() == shoppingCart.getProduct().getId()) {
                    newShoppingCart = shoppingCartList.get(i);
                    newShoppingCart.setQuantity(newShoppingCart.getQuantity() + shoppingCart.getQuantity());
                    count++;
                    break;
                }
            }
            if (count == 0) {
                shoppingCart.setCustomer(customer);
                iShoppingCartRepository.save(shoppingCart);
            } else {
                iShoppingCartRepository.save(newShoppingCart);
            }
        } else {
            return null;
        }
        return iShoppingCartRepository.getAll(customer.getId());
//        iShoppingCartRepository.save(shoppingCart);
    }

    @Override
    public List<ShoppingCart> updateShoppingCart(String operator, Long id, String isLogin, HttpServletRequest httpServletRequest) {
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
            Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
            ShoppingCart shoppingCart = iShoppingCartRepository.getCartById(id);
            shoppingCart.setQuantity(shoppingCart.getQuantity() + sign);
            if (shoppingCart.getQuantity() == 0) {
                iShoppingCartRepository.deleteCart(shoppingCart.getId(), customer.getId());
            } else {
                iShoppingCartRepository.save(shoppingCart);
            }
            return iShoppingCartRepository.getAll(customer.getId());
        } else {
            if (shoppingCartList != null) {
                for (int i = 0; i < shoppingCartList.size(); i++) {
                    if (shoppingCartList.get(i).getProduct().getId() == id) {
                        shoppingCartList.get(i).setQuantity(shoppingCartList.get(i).getQuantity() + sign);
                        if (shoppingCartList.get(i).getQuantity() == 0) {
                            shoppingCartList.remove(shoppingCartList.get(i));
                        }
                    }
                }
            }
            session.setAttribute("cart", shoppingCartList);
            return (List<ShoppingCart>) session.getAttribute("cart");
        }
    }

    @Override
    public List<ShoppingCart> deleteCartSession(Long productId, HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        List<ShoppingCart> shoppingCartList = (List<ShoppingCart>) session.getAttribute("cart");
        if (shoppingCartList != null) {
            for (int i = 0; i < shoppingCartList.size(); i++) {
                if (shoppingCartList.get(i).getProduct().getId() == productId) {
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
    public List<ShoppingCart> showShoppingCart(HttpServletRequest httpServletRequest) {
        List<ShoppingCart> shoppingCartList = new ArrayList<>();
        Customer customer = customerRestController.getCustomerFromToken(httpServletRequest);
        HttpSession session = httpServletRequest.getSession();
        if (session.getAttribute("cart") != null) {
            List<ShoppingCart> cartSession = (List<ShoppingCart>) session.getAttribute("cart");
            for (int i = 0; i < cartSession.size(); i++) {
                ShoppingCart newCart = new ShoppingCart();
                ShoppingCart cartDuplicate = iShoppingCartRepository.getCartByCustomerIdAndProductId(customer.getId(), cartSession.get(i).getProduct().getId());
                if (cartDuplicate != null) {
                    cartDuplicate.setQuantity(cartSession.get(i).getQuantity() + cartDuplicate.getQuantity());
                            iShoppingCartRepository.save(cartDuplicate);
                } else {
                    newCart.setCustomer(customer);
                    newCart.setProduct(cartSession.get(i).getProduct());
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
        return shoppingCartList;
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
