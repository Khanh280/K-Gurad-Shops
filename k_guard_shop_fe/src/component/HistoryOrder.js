import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as OrdersService from "../service/OrdersService";
import {toast} from "react-toastify";
import {PayPalButton} from "react-paypal-button-v2";
import * as OrderService from "../service/OrdersService"
import Swal from "sweetalert2";
import {NavLink} from "react-router-dom";

export default function HistoryOrder() {
    const [orders, setOrder] = useState()
    const getAllOrderCustomer = async (page) => {
        try {
            const res = await OrdersService.getAllOrderCustomer(page)
            setOrder(() => res.data.content)
        } catch (e) {

        }

    }

    useEffect(() => {
        getAllOrderCustomer(0)
    }, [])
    if (!orders) {
        return null;
    }
    return (
        <>
            <div className="col-md-3 " style={{minHeight: "40rem"}}>
                <div className="row mb-4 sticky-col"
                     style={{minHeight: "25rem", border: "1px solid gray", borderRadius: "5px"}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h4>Lịch sử giao dịch</h4>
                        <img src="/anh/KGuard3.png" alt="" style={{width: "3rem"}}/>
                    </div>
                    <div className="">
                        <div className="d-flex justify-content-between mt-2">
                            <b>Tổng tiền hàng</b>
                            {/*<span>{totalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>*/}
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <b>Phí vận chuyển</b>
                            {/*<span>{(30000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>*/}
                        </div>
                        <hr className="my-1"/>
                        <div className="d-flex justify-content-between ">
                            <b>Tổng thanh toán:</b>
                            {/*<span>{(totalPrice() + 30000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>*/}
                        </div>
                        <div className="row mt-2">


                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-9 ">
                <table className="col-md-12">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ngày mua</th>
                        <th>Đơn giá</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((order) =>
                            <tr>
                                <td className="">
                                    <p className="my-2">{order.id}</p>
                                </td>
                                <td className="">
                                    <p className="my-2">{order?.createDate}</p>
                                </td>
                                <td className="">
                                    <p className="my-2">{order?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
                                </td>
                                <td className="">
                                    <p className="my-2">Da thanh toan</p>
                                </td>
                                <td className="">
                                    {/*<p className=""><i*/}
                                    {/*    className="bi bi-exclamation-circle text-info"></i></p>*/}
                                    <div >
                                        <NavLink to={`/cart/history/order-detail-customer/${order.id}`}>
                                            <i className="bi bi-exclamation-circle text-info"
                                               style={{cursor: "pointer"}}
                                               title="Chi tiết đơn hàng"></i>
                                        </NavLink>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        </>
    )
}