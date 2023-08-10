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
import {cleanup} from "@testing-library/react";

export default function ShoppingCart() {
    const dispatch = useDispatch()
    const [shoppingCarts, setShoppingCarts] = useState()
    const [quantity, setQuantity] = useState();
    const [isLogin,setIsLogin] = useState(false)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const getAllCart = async () => {
        const res = await axios.get("http://localhost:8080/api/shopping-cart", {withCredentials: true})
        setShoppingCarts(() => res.data)
    }
    const editQuantity = async (operator, productId) => {
        const res = await axios.post("http://localhost:8080/api/shopping-cart/edit-cart/" + operator + "/" + (+productId), "", {withCredentials: true})
        setShoppingCarts(() => res.data)
        dispatch(updateCart(res.data.length))
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
                const res = await axios.post("http://localhost:8080/api/shopping-cart/delete-product-cart", id, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "text/plain"
                    }
                })
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
        if(token){
            setIsLogin(()=>true)
        }
        getAllCart()
        window.scrollTo(0, 0)
        console.log("mount")
        return () => {
            // shoppingCarts
            const save =  async ()=>{
                await axios.post("http://localhost:8080/api/shopping-cart/save","",{withCredentials:true})
            }
            save()
        }
    }, [])
    if (!shoppingCarts) {
        return null
    }
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark align-items-center d-flex mb-3" align="" style={{height: "3rem"}}>
                    <div className=" col-md-4">
                        <h4 className="px-0 my-2" style={{display: "flex", color: "white"}}>K-Guard Shop | Giỏ
                            hàng</h4>
                    </div>
                </div>
                <div className="row d-flex">

                    {
                        shoppingCarts.length > 0 ?
                            <>
                                <div className="col-md-9 ">
                                    <table className="col-md-12">
                                        <thead>
                                        <tr
                                            // style={{border: "2px solid #f4882fc7",height: "3rem"}}
                                        >
                                            <th>Sản phẩm</th>
                                            <th></th>
                                            <th>Brand</th>
                                            <th>Loại</th>
                                            <th>Số lượng</th>
                                            <th>Chức năng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            shoppingCarts.map((shoppingCart, index) =>
                                                <tr key={index} className="row-table-height">
                                                    <td className="row-table-height">
                                                        <img
                                                            src={shoppingCart.image}
                                                            style={{width: "5rem"}}/>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <p className="row-table">{shoppingCart.product.name}</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <p className="row-table">SP-{shoppingCart.product.id}</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <p className="row-table">{shoppingCart.product.productType.name}</p>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <div className="row-table d-flex">
                                                            <button className="btn btn-dark btn-operator-plus"
                                                                    style={{backgroundColor: "white", border: "none",}}
                                                                    onClick={() => editQuantity("minus", shoppingCart.product.id)}><span
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
                                                                    onClick={() => editQuantity("plus", shoppingCart.product.id)}><span
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    color: "black"
                                                                }}>+</span></button>
                                                        </div>
                                                    </td>
                                                    <td className="row-table-height">
                                                        <div className="row-table">
                                                            {/*<button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i*/}
                                                            {/*    className="bi bi-pencil" title="Chỉnh sửa"></i></button>*/}
                                                            <i className="bi bi-x" style={{cursor: "pointer"}}
                                                               title="Xóa"
                                                               onClick={() => modals(shoppingCart.product.name, shoppingCart.product.id)}></i>
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
                                                id: ""
                                            }}
                                            onSubmit={async (values) => {
                                                if(isLogin){
                                                    toast.success("Thanh toán thành công")
                                                }else {
                                                   await navigate("/login")
                                                    await toast.warning("Cần phải đăng nhập để thanh toán")
                                                }
                                                console.log("sdfds")
                                            }}>
                                            <Form className="mb-2">
                                                <div className="d-flex">
                                                    <label className="radio col-md-3">
                                                        <input type="radio" name="card" defaultValue="payment"
                                                               defaultChecked=""/>
                                                        <span>
                                                <img width={30}
                                                     src="https://img.icons8.com/color/48/000000/mastercard.png"
                                                     alt=""/>
                                            </span>
                                                    </label>
                                                    <label className="radio col-md-3">
                                                        <input type="radio" name="card" defaultValue="payment"/>
                                                        <span>
                                                <img width={30} src="https://img.icons8.com/officel/48/000000/visa.png"
                                                     alt=""/>
                                            </span>
                                                    </label>
                                                    <label className="radio col-md-3">
                                                        <input type="radio" name="card" defaultValue="payment"/>
                                                        <span>
                                                <img width={30}
                                                     src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
                                                     alt=""/>
                                            </span>
                                                    </label>
                                                    <label className="radio col-md-3">
                                                        <input type="radio" name="card" defaultValue="payment"/>
                                                        <span>
                                                <img width={30}
                                                     src="https://img.icons8.com/officel/48/000000/paypal.png" alt=""/>
                                            </span>
                                                    </label>
                                                </div>
                                                <div className="d-flex">
                                                    <label className="radio col-md-12">
                                                        <input type="radio" name="card" defaultValue="payment"/>
                                                        <span id="buy-here">
                                                Thanh toán khi nhận hàng
                                            </span>
                                                    </label>
                                                </div>

                                                <div className="row">
                                                    <label htmlFor="" className="mt-2">Tên thẻ</label>
                                                    <div className="col-md-12">
                                                        <input className="form-control" type="text"/>
                                                    </div>
                                                    <label htmlFor="" className="mt-2">Số thẻ</label>
                                                    <div className="col-md-12">
                                                        <input className="form-control" type="text"/>
                                                    </div>
                                                    <label htmlFor="" className="mt-2">Số điện thoại</label>
                                                    <div className="col-md-12">
                                                        <input className="form-control" type="text"/>
                                                    </div>
                                                    <label htmlFor="" className="mt-2">Địa chỉ nhận hàng</label>
                                                    <div className="col-md-12">
                                                        <textarea className="form-control"></textarea>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="">
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <b>Tổng tiền hàng</b>
                                                        <span>{totalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <b>Phí vận chuyển</b>
                                                        <span>3000đ</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <b>Tổng thanh toán:</b>
                                                        <span>3000đ</span>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div>
                                                            <button type="submit" className="btn login-button">Đặt hàng</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                                <BackUp />
                            </>
                            :
                            <div className="col-md-12" align="center">
                                <h5>Chưa có sản phẩm nào trong giỏ hàng.</h5>
                                <NavLink to="/" className="btn btn-sm btn-success">Quay trở lại cửa hàng</NavLink>
                            </div>
                    }
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}