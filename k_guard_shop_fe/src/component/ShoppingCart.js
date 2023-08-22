import React, {useEffect, useState} from "react";
import "../css/cart.css"
import {Form, Formik, Field} from "formik";
import Swal from "sweetalert2";
import BackUp from "./BackUp";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {updateCart} from "../redux/actions/cart";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import * as CustomerService from "../service/CustomerService"
import * as ShoppingCartService from "../service/ShoppingCartService"
import * as OrdersService from "../service/OrdersService"
import {PayPalButton} from "react-paypal-button-v2";
import {Outlet} from "react-router";


export default function ShoppingCart() {
    const dispatch = useDispatch()
    const [shoppingCarts, setShoppingCarts] = useState()
    const [quantity, setQuantity] = useState();
    const [isLogin, setIsLogin] = useState(false)
    const [customer, setCustomer] = useState()
    const [pricePaypal, setPricePaypal] = useState(0)
    const [chooseOption, setChooseOption] = useState(true)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const getCustomer = async () => {
        const res = await CustomerService.getCustomer()
        setCustomer(() => res.data)
    }
    const getAllCart = async (isLogin) => {
        const res = await ShoppingCartService.getAllCart(isLogin)
        setShoppingCarts(() => res.data)
    }
    const editQuantity = async (operator, id) => {
        try {
            const res = await ShoppingCartService.editQuantity(operator, id, isLogin)
            setShoppingCarts(() => res.data)
            dispatch(updateCart(res.data.length))
        } catch (e) {
            setShoppingCarts(() => e.response.data)
            dispatch(updateCart(e.response.data.length))
            toast.warning("Số lượng lớn hơn số lượng trong kho.")
        }

    }
    const modals = async (name, id) => {
        Swal.fire({
            icon: "warning",
            title: "Xóa sản phẩm",
            html: `Bạn có muốn xoá đơn hàng <span style="color: red">${name}</span> không?`,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                let res;
                if (isLogin) {
                    res = await ShoppingCartService.deleteCartLogin(id)
                } else {
                    res = await ShoppingCartService.deleteCartSession(id)
                }
                await setShoppingCarts(() => res.data)
                await dispatch(updateCart(res.data.length))
            }
        })
    }
    const totalPrice = () => {
        let totalPrice = 0;
        if (shoppingCarts) {
            for (let p of shoppingCarts) {
                if (p.quantity <= p.productSize.product.quantity) {
                    totalPrice += p.productSize.product.price * p.quantity
                }
            }
        }
        return totalPrice;
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (token) {
            setIsLogin(() => true)
            getAllCart(true)
            getCustomer()
        } else {
            getAllCart(false)
        }
        return () => {
            // shoppingCarts
            // const save = async () => {
            //     await axios.post("http://localhost:8080/api/shopping-cart/save", "", {withCredentials: true})
            // }
            // save()
        }
    }, [])
    if (!shoppingCarts) {
        return null
    }
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>

                <div className="row d-flex">


                    <>
                        <div className="row bg-dark col-md-12 align-items-center d-flex mb-3 mx-0" align=""
                             style={{height: "3rem"}}>
                            <div className="d-flex col-md-12" style={{height: "100%"}}>
                                <h4 className="px-0 my-2" style={{display: "flex", color: "white"}}>K-Guard
                                    Shop | </h4>
                                {/*<h4 className="px-0 my-2" style={{display: "flex", color: "white"}}>Gio hang</h4>*/}

                                <ul className="px-0 my-0 col-md-2 justify-content-evenly"
                                    style={{display: "flex", color: "white"}}>
                                    <li style={{height: "100%", display: "flex", alignItems: "center"}}>
                                        <NavLink to="/cart/list"
                                                 className="cart-item"
                                                 style={({isActive}) => {
                                                     return {
                                                         borderBottom: isActive || chooseOption ? "3px solid #F4882F" : "   ",
                                                         color: isActive ? "white" : "",
                                                         alignItems: "center",
                                                         display: "flex"
                                                     }
                                                 }}
                                        >Giỏ hàng</NavLink>
                                    </li>
                                    <li style={{height: "100%", display: "flex", alignItems: "center"}}>
                                        <NavLink to="/cart/history"
                                                 className="cart-item"
                                                 onClick={() => setChooseOption(false)}
                                                 style={({isActive}) => {
                                                     return {
                                                         borderBottom: isActive ? "3px solid #F4882F" : "   ",
                                                         color: isActive ? "white" : "",
                                                         alignItems: "center",
                                                         display: "flex"
                                                     }
                                                 }}
                                        >Lịch sử giao dịch</NavLink>
                                    </li>
                                    {/*<NavLink to="/cart/list">*/}
                                    {/*    <li className="d-flex align-items-center" style={{minWidth: "5rem"}}>Giỏ*/}
                                    {/*        hàng*/}
                                    {/*    </li>*/}
                                    {/*</NavLink>*/}
                                    {/*<NavLink to="/cart/history-order">*/}
                                    {/*    <li className="d-flex align-items-center"*/}
                                    {/*        style={{minWidth: "5rem"}}>Lịch sử*/}
                                    {/*        giao dịch*/}
                                    {/*    </li>*/}
                                    {/*</NavLink>*/}
                                </ul>
                            </div>
                        </div>
                        <Outlet/>
                        <BackUp/>
                    </>
                </div>

                <ToastContainer style={{top: "5.6rem"}}/>
            </div>
        </>
    )
}