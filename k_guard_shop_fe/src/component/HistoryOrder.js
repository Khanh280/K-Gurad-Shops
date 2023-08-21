import React, {useEffect} from "react";
import {Field, Form, Formik} from "formik";
import * as OrdersService from "../service/OrdersService";
import {toast} from "react-toastify";
import {PayPalButton} from "react-paypal-button-v2";

export default function HistoryOrder() {
    useEffect()
    return (
        <>
            <div className="col-md-9 ">
                <table className="col-md-12">
                    <thead>
                    <tr
                        // style={{border: "2px solid #f4882fc7",height: "3rem"}}
                    >
                        <th>Id</th>
                        <th>Ngày mua</th>
                        <th>Đơn giá</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <td className="row-table-height">
                        <p className="row-table">abc</p>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">abc</p>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">abc</p>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">abc</p>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">abc</p>
                    </td>
                    </tbody>
                </table>
            </div>
            <div className="col-md-3 " style={{minHeight: "40rem"}}>
                <div className="row mb-4 sticky-col"
                     style={{minHeight: "25rem", border: "1px solid gray", borderRadius: "5px"}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h4>Thông tin hóa đơn</h4>
                        <img src="/anh/KGuard3.png" alt="" style={{width: "3rem"}}/>
                    </div>
                            <div className="d-flex">
                                <label className="radio col-md-3">

                                </label>
                                <label className="radio col-md-3">

                                </label>
                                <label className="radio col-md-3">

                                </label>
                                <label className="radio col-md-3">

                                </label>
                            </div>
                            <div className="d-flex">
                                <label className="radio col-md-12">

                                </label>
                            </div>

                            <div className="row">

                            </div>
                            {/*<hr/>*/}
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
        </>
    )
}