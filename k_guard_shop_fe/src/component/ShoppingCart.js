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


export default function ShoppingCart() {
    const dispatch = useDispatch()
    const [shoppingCarts, setShoppingCarts] = useState()
    const [quantity, setQuantity] = useState();
    const [isLogin, setIsLogin] = useState(false)
    const [customer, setCustomer] = useState()
    const [pricePaypal, setPricePaypal] = useState(0)
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
                totalPrice += p.product.price * p.quantity
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

                    {
                        shoppingCarts.length > 0 ?
                            <>
                                <div className="col-md-9 ">
                                    <div className="row bg-dark col-md-12 align-items-center d-flex mb-3" align=""
                                         style={{height: "3rem"}}>
                                        <div className=" col-md-12">
                                            <h4 className="px-0 my-2" style={{display: "flex", color: "white"}}>K-Guard
                                                Shop | Giỏ
                                                hàng</h4>
                                        </div>
                                    </div>
                                    <table className="col-md-12">
                                        <thead>
                                        <tr
                                            // style={{border: "2px solid #f4882fc7",height: "3rem"}}
                                        >
                                            <th>Sản phẩm</th>
                                            <th>Brand</th>
                                            <th>Loại</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            shoppingCarts.map((shoppingCart, index) =>
                                                <tr key={index} className="row-table-height">
                                                    <td className="row-table-height d-flex">
                                                        <img
                                                            src={shoppingCart?.image}
                                                            style={{width: "5rem"}}/>
                                                        {/*</td>*/}
                                                        {/*<td className="row-table-height">*/}
                                                        <p className="row-table">{shoppingCart?.product?.name}</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <p className="row-table">{shoppingCart?.product?.brand?.name}</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <p className="row-table">{shoppingCart?.product?.productType?.name}</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <div className="row-table d-flex"
                                                             style={{marginBottom: "1rem"}}>
                                                            <button className="btn btn-dark btn-operator-plus"
                                                                    style={{backgroundColor: "white", border: "none",}}
                                                                    onClick={() => isLogin ? editQuantity("minus", shoppingCart.id) : editQuantity("minus", shoppingCart.product.id)}><span
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    color: "black"
                                                                }}>-</span></button>
                                                            <input id="input-quantity-product" className="form-control"
                                                                   type="text"
                                                                   readOnly
                                                                   style={{border: "none",}}
                                                                   value={shoppingCart.quantity}/>
                                                            <button className="btn btn-dark btn-operator-subs"
                                                                    style={{backgroundColor: "white", border: "none",}}
                                                                    onClick={() => isLogin ? editQuantity("plus", shoppingCart.id) : editQuantity("plus", shoppingCart.product.id)}><span
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    color: "black"
                                                                }}>+</span></button>
                                                        </div>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <p className="row-table">{shoppingCart?.product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <div className="row-table" style={{marginBottom: "1rem"}}>
                                                            {/*<button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i*/}
                                                            {/*    className="bi bi-pencil" title="Chỉnh sửa"></i></button>*/}
                                                            <i className="bi bi-x" style={{cursor: "pointer"}}
                                                               title="Xóa sản phẩm"
                                                               onClick={() => isLogin ? modals(shoppingCart.product.name, shoppingCart.id) :
                                                                   modals(shoppingCart.product.name, shoppingCart.product.id)}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )

                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-3 " style={{minHeight: "40rem"}}>
                                    <div className="row mb-4 sticky-col"
                                         style={{minHeight: "40rem", border: "1px solid gray", borderRadius: "5px"}}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>Thông tin hóa đơn</h4>
                                            <img src="/anh/KGuard3.png" alt="" style={{width: "3rem"}}/>
                                        </div>

                                        <Formik
                                            initialValues={{
                                                nameCard: "",
                                                numberCard: "",
                                            }}
                                            onSubmit={async (values) => {
                                                if (isLogin) {
                                                    const saveOrder = async () => {
                                                        const res = await OrdersService.saveOrders()
                                                        console.log(res)
                                                    }
                                                    await saveOrder()
                                                    await toast.success("Thanh toán thành công")
                                                } else {
                                                    await navigate("/login")
                                                    await toast.warning("Cần phải đăng nhập để thanh toán")
                                                }
                                            }}>
                                            <Form className="mb-2">
                                                <div className="d-flex">
                                                    <label className="radio col-md-3">
                                                        <Field type="radio" name="card" defaultValue="payment"
                                                               defaultChecked=""/>
                                                        <span>
                                                <img width={30}
                                                     src="https://img.icons8.com/color/48/000000/mastercard.png"
                                                     alt=""/>
                                            </span>
                                                    </label>
                                                    <label className="radio col-md-3">
                                                        <Field type="radio" name="card" defaultValue="payment"/>
                                                        <span>
                                                <img width={30} src="https://img.icons8.com/officel/48/000000/visa.png"
                                                     alt=""/>
                                            </span>
                                                    </label>
                                                    <label className="radio col-md-3">
                                                        <Field type="radio" name="card" defaultValue="payment"/>
                                                        <span>
                                                <img width={30}
                                                     src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
                                                     alt=""/>
                                            </span>
                                                    </label>
                                                    <label className="radio col-md-3">
                                                        <Field type="radio" name="card" defaultValue="payment"/>
                                                        <span>
                                                <img width={30}
                                                     src="https://img.icons8.com/officel/48/000000/paypal.png" alt=""/>
                                            </span>
                                                    </label>
                                                </div>
                                                <div className="d-flex">
                                                    <label className="radio col-md-12">
                                                        <Field type="radio" name="card" defaultValue="payment"/>
                                                        <span id="buy-here">
                                                Thanh toán khi nhận hàng
                                            </span>
                                                    </label>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="mt-2">Tên thẻ</label>
                                                    <div className="col-md-12">
                                                        <Field className="form-control" name="nameCard" type="text"/>
                                                    </div>
                                                    <label htmlFor="" className="mt-2">Số thẻ</label>
                                                    <div className="col-md-12">
                                                        <Field className="form-control" name="numberCard" type="text"/>
                                                    </div>
                                                    <label htmlFor="" className="mt-2">Số điện thoại</label>
                                                    <div className="col-md-12">
                                                        <Field className="form-control" type="text"
                                                               value={customer?.phoneNumber}/>
                                                    </div>
                                                    <label htmlFor="" className="mt-2">Địa chỉ nhận hàng</label>
                                                    <div className="col-md-12">
                                                        <Field as="textarea" className="form-control"
                                                               value={customer?.address}/>
                                                    </div>
                                                </div>
                                                {/*<hr/>*/}
                                                <div className="">
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <b>Tổng tiền hàng</b>
                                                        <span>{totalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <b>Phí vận chuyển</b>
                                                        <span>{(30000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                                    </div>
                                                    <hr className="my-1"/>
                                                    <div className="d-flex justify-content-between ">
                                                        <b>Tổng thanh toán:</b>
                                                        <span>{(totalPrice() + 30000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <PayPalButton
                                                            amount={Math.ceil((totalPrice()+30000)/23000)}
                                                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                                            onSuccess={(details, data) => {
                                                                alert("Transaction completed by " + details.payer.name.given_name);

                                                                // OPTIONAL: Call your server to save the transaction
                                                                return fetch("/paypal-transaction-complete", {
                                                                    method: "post",
                                                                    body: JSON.stringify({
                                                                        orderID: data.orderID
                                                                    })
                                                                });
                                                            }}
                                                            onError={(e) => {
                                                                alert("ụdgfhdshfjhbn")
                                                            }}
                                                        />
                                                        <div>
                                                            <button type="submit" className="btn login-button">Đặt
                                                                hàng
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                                <BackUp/>
                            </>
                            :
                            <div className="col-md-12" align="center">
                                <h5>Chưa có sản phẩm nào trong giỏ hàng.</h5>
                                <NavLink to="/" className="btn btn-sm btn-success">Quay trở lại cửa hàng</NavLink>
                            </div>
                    }
                </div>
                <ToastContainer style={{top: "5.6rem"}}/>
            </div>
        </>
    )
}