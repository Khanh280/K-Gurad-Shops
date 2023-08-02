import "bootstrap/dist/css/bootstrap-grid.css"
import React from "react";
import {Link, NavLink} from "react-router-dom";

export default function Header() {
    return (
        <div id="header-nav" className="row">
            <div id="header-nav-logo" className="col-md-2">
                <img src="/anh/KGuard3.png" alt="" style={{height: "13vh", width: "13vh"}}/>
            </div>
            <div id="header-nav-option" className="col-md-10">
                <ul style={{position: "relative"}}>
                    <li>
                        <NavLink to="/"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/b"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Giới thiệu</NavLink>
                    </li>
                    <li className="nav-product nav-sub">
                        <NavLink to="/product"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Sản phẩm
                        </NavLink>
                        <ul id="sub-nav-product">
                            <li>Mũ FullFace</li>
                            <li>Mũ 3/4</li>
                            <li>Giáp bảo hộ</li>
                            <li>Găng tay</li>
                            <li>Giày bảo hộ</li>
                        </ul>
                    </li>
                    <li className="nav-product nav-sub">
                        <NavLink to="/d"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Thương hiệu</NavLink>
                        <ul id="sub-nav-product">
                            <li>HJC</li>
                            <li>LS2</li>
                            <li>KYT</li>
                            <li>AGV</li>
                            <li>Yohe</li>
                            <li>ALPINESTARS</li>
                            <li>FOX RACING</li>
                            <li>JOE ROCKET</li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to="/e"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Liên hệ</NavLink>
                    </li>

                    <li>
                        <NavLink to="/login" className=""
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Đăng nhập
                            <i style={{marginLeft: "0.5rem"}}
                               className="fa-regular fa-user"></i>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/cart" className="me-5"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >
                            <i className="bi bi-cart-dash"><sup style={{fontWeight: 600}}>2</sup></i>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}