import './App.css';
import React from "react";
import LoginForm from "./component/login/LoginForm";
import Header from "./component/Header";
import {Routes, Route} from "react-router";
import Footer from "./component/Footer";
import Home from "./component/Home";
import DetailProduct from "./component/DetailProduct";
import ShoppingCart from "./component/ShoppingCart";

function App() {
    return (
        <>
            <Header/>
            <div style={{minHeight: "97.5vh",marginTop: "10vh"}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/detail" element={<DetailProduct/>}/>
                    <Route path="/cart" element={<ShoppingCart/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
