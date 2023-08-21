import './App.css';
import React from "react";
import LoginForm from "./component/login/LoginForm";
import Header from "./component/Header";
import {Routes, Route} from "react-router";
import Footer from "./component/Footer";
import Home from "./component/Home";
import DetailProduct from "./component/DetailProduct";
import ShoppingCart from "./component/ShoppingCart";
import ProductHome from "./component/ProductHome";
import RegisterForm from "./component/RegisterForm";
import {Provider} from "react-redux";
import store from "./redux/store";
import InfoStore from "./component/info_store/InfoStore";
import ProductList from "./component/info_store/ProductList";
import CreateProduct from "./component/info_store/CreateProduct";
import CartList from "./component/CartList";
import HistoryOrder from "./component/HistoryOrder";
import OrderDetailCustomer from "./component/OrderDetailCustomer";

function App() {
    return (
        <>
            <Provider store={store}>
                <Header/>
                <div style={{minHeight: "97.5vh", marginTop: "10vh"}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/info-store" element={<InfoStore/>}>
                            <Route path="/info-store" element={<ProductList/>}/>
                            <Route path="/info-store/create-product" element={<CreateProduct/>}/>
                            <Route path="/info-store/product-list" element={<ProductList/>}/>
                        </Route>
                        <Route path="/product" element={<ProductHome/>}/>
                        <Route path="/product-brand" element={<ProductHome/>}/>
                        <Route path="/product/:type" element={<ProductHome/>}/>
                        <Route path="/product-brand/:brand" element={<ProductHome/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route path="/product/detail/:id" element={<DetailProduct/>}/>
                        <Route path="/cart" element={<ShoppingCart/>}>
                            <Route path="/cart" element={<CartList/>}/>
                            <Route path="/cart/list" element={<CartList/>}/>
                            <Route path="/cart/history" element={<HistoryOrder/>}/>
                            <Route path="/cart/history/order-detail-customer/:id" element={<OrderDetailCustomer/>}/>
                        </Route>
                    </Routes>
                </div>
                <Footer/>
            </Provider>
        </>
    );
}

export default App;
