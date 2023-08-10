import "bootstrap/dist/css/bootstrap-grid.css"
import React, {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {getAllCart} from "../redux/actions/cart";
import {useDispatch, useSelector} from "react-redux";

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
        const res = await axios.get("http://localhost:8080/api/product/product-type")
        setProductType(() => res.data)
    }
    const getAllBrand = async () => {
        const res = await axios.get("http://localhost:8080/api/product/brand")
        setBrand(() => res.data)
    }

    const handlerLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setIsLogin(false);
        toast.success("Đăng xuất thành công !!");
        navigate("/login")
    };
    useEffect(() => {
        dispatch(getAllCart())
        getAllProductType()
        getAllBrand()
        if (token) {
            setIsLogin(() => true);
        } else {

        }
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


                    {
                        isLogin ?
                            role && role === "ROLE_ADMIN" ?
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

                                            <li className="d-flex justify-content-between align-items-center">Quản
                                                lý cửa hàng
                                                <i className="bi bi-person-lines-fill pe-2"
                                                   style={{fontSize: "1.5rem"}}></i>
                                            </li>
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
                                            <i className="bi bi-cart-dash"><sup style={{fontWeight: 600}}>{quantityProduct}</sup></i>
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
                                        <i className="bi bi-cart-dash"><sup style={{fontWeight: 600}}>{quantityProduct}</sup></i>
                                    </NavLink>
                                </li>
                            </>

                    }
                </ul>
            </div>
        </div>
    )
}