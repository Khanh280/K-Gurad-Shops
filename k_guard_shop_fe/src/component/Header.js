import "bootstrap/dist/css/bootstrap-grid.css"
import React, {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {getAllCart, updateCart} from "../redux/actions/cart";
import {useDispatch, useSelector} from "react-redux";
import * as ProductService from "../service/ProductService"

export default function Header() {
    const quantityProduct = useSelector(state => state.cart)
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    const role = localStorage.getItem("role")
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const [productTypes, setProductType] = useState();
    const [brands, setBrand] = useState();
    const dispatch = useDispatch()

    const getAllProductType = async () => {
        try {
            const res = await ProductService.getAllProductType()
            setProductType(() => res.data)
        } catch (e) {
            setProductType(() => [])
        }
    }
    const getAllBrand = async () => {
        try {
            const res = await ProductService.getAllBrand()
            setBrand(() => res.data)
        } catch (e) {
            setBrand(() => [])
        }
    }

    const handlerLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setIsLogin(false);
        toast.success("Đăng xuất thành công !!");
        dispatch(getAllCart("logout"))
        navigate("/login")
    };
    useEffect(() => {

        if (token) {
            setIsLogin(() => true);
            dispatch(getAllCart(true))
        } else {
            dispatch(getAllCart(false))
        }
        getAllProductType()
        getAllBrand()
    }, [token])
    if (!productTypes || !brands) {
        return null;
    }
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

                    {
                        role === "ROLE_ADMIN" ?
                            <li>
                                <NavLink to="/info-store"
                                         style={({isActive}) => {
                                             return {
                                                 backgroundColor: isActive ? "#F4882F" : "   ",
                                                 color: isActive ? "black" : "",
                                                 borderRadius: "10px",
                                             }
                                         }}
                                >Quản lý cửa hàng</NavLink>
                            </li>
                            :
                            // <NavLink to="/b"
                            //          style={({isActive}) => {
                            //              return {
                            //                  backgroundColor: isActive ? "#F4882F" : "   ",
                            //                  color: isActive ? "black" : "",
                            //                  borderRadius: "10px",
                            //              }
                            //          }}
                            // >Giới thiệu</NavLink>
                            ""
                    }
                    <li>
                        <NavLink to="/news-page/list"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Tin tức</NavLink>
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
                            {
                                productTypes.map((productType) =>
                                    <NavLink to={`/product/${productType.id}`} className="p-0 option-product">
                                        <li>{productType.name}</li>
                                    </NavLink>
                                )
                            }
                        </ul>
                    </li>
                    <li className="nav-product nav-sub">
                        <NavLink to="/product-brand"
                                 style={({isActive}) => {
                                     return {
                                         backgroundColor: isActive ? "#F4882F" : "   ",
                                         color: isActive ? "black" : "",
                                         borderRadius: "10px",
                                     }
                                 }}
                        >Thương hiệu</NavLink>
                        <ul id="sub-nav-product">
                            {
                                brands.map((brand) =>
                                    <NavLink to={`/product-brand/${brand.id}`} className="p-0 option-product">
                                        <li>{brand.name}</li>
                                    </NavLink>
                                )
                            }
                        </ul>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink to="/e"*/}
                    {/*             style={({isActive}) => {*/}
                    {/*                 return {*/}
                    {/*                     backgroundColor: isActive ? "#F4882F" : "   ",*/}
                    {/*                     color: isActive ? "black" : "",*/}
                    {/*                     borderRadius: "10px",*/}
                    {/*                 }*/}
                    {/*             }}*/}
                    {/*    >Liên hệ</NavLink>*/}
                    {/*</li>*/}


                    {
                        isLogin ?
                            role && role === "ROLE_ADMIN" ?
                                <>
                                    <li className="nav-product nav-sub me-4">
                                        <Link to="" className=""
                                              style={{
                                                  color: "black",
                                                  borderRadius: "10px"
                                              }}
                                        >{username}
                                            <i style={{marginLeft: "0.5rem"}}
                                               className="fa-regular fa-user"></i>
                                        </Link>
                                        <ul id="sub-nav-product" style={{maxWidth: "12rem"}}>
                                            <NavLink className="p-0" to="/info-store">
                                                <li className="d-flex justify-content-between align-items-center store-manager"
                                                    style={{width: "100%"}}>
                                                    Quản lý cửa hàng
                                                    <i className="bi bi-person-lines-fill pe-2"
                                                       style={{fontSize: "1.5rem"}}></i>
                                                </li>
                                            </NavLink>
                                            <li onClick={() => handlerLogout()}
                                                className="d-flex justify-content-between align-items-center">Đăng xuất
                                                <i className="bi bi-box-arrow-right  pe-2"
                                                   style={{fontSize: "1.5rem"}}></i>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-product nav-sub me-3">
                                        <Link to="" className=""
                                              style={{
                                                  color: "black",
                                                  borderRadius: "10px"
                                              }}
                                        >{username}
                                            <i style={{marginLeft: "0.5rem"}}
                                               className="fa-regular fa-user"></i>
                                        </Link>
                                        <ul id="sub-nav-product" style={{maxWidth: "12rem"}}>
                                            <NavLink className="p-0" to="/information-user">
                                                <li className="d-flex justify-content-between align-items-center store-manager"
                                                    style={{width: "100%"}}>
                                                    Thông tin cá nhân
                                                    <i className="bi bi-person-lines-fill pe-2"
                                                       style={{fontSize: "1.5rem"}}></i>
                                                </li>
                                            </NavLink>
                                            <li onClick={() => handlerLogout()}
                                                className="d-flex justify-content-between align-items-center">Đăng xuất
                                                <i className="bi bi-box-arrow-right  pe-2"
                                                   style={{fontSize: "1.5rem"}}></i>
                                            </li>
                                        </ul>
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
                                            <i className="bi bi-cart-dash"><sup
                                                style={{fontWeight: 600}}>{quantityProduct > 0 ? quantityProduct : 0}</sup></i>
                                        </NavLink>
                                    </li>
                                </>
                            :
                            <>
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
                                        <i className="bi bi-cart-dash"><sup
                                            style={{fontWeight: 600}}>{quantityProduct > 0 ? quantityProduct : 0}</sup></i>
                                    </NavLink>
                                </li>
                            </>

                    }
                </ul>
            </div>
        </div>
    )
}