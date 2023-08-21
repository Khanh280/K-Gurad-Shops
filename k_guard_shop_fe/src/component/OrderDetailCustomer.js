import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as OrderService from "../service/OrdersService"

export default function OrderDetailCustomer() {
    const [orderDetails, setOrderDetail] = useState()
    const param = useParams()
    const getAllOrderDetail = async (page, orderId) => {
        const res = await OrderService.getAllOrderDetailCustomer(page, orderId)
        setOrderDetail(() => res.data.content)
    }
    useEffect(() => {
        getAllOrderDetail(0, param.id)
    }, [])
    if (!orderDetails) {
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
            <div className="col-md-9 ">
                <table className="col-md-12">
                    <thead>
                    <tr>
                        {/*<th>Id</th>*/}
                        <th>Sản phẩm</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orderDetails.map((orderDetail) =>
                            <tr>
                                {/*<td className="row-table-height">*/}
                                {/*    <p className="row-table">{orderDetail.id}</p>*/}
                                {/*</td>*/}
                                <td className="row-table-height d-flex">
                                    <img src={orderDetail?.linkImage} alt="" style={{width: "5rem"}}/>
                                    <p className="row-table ms-1">{orderDetail?.productName}</p>
                                </td>
                                <td className="row-table-height">
                                    <p className="row-table">{orderDetail?.size}</p>
                                </td>
                                <td className="row-table-height">
                                    <p className="row-table">{orderDetail?.quantity}</p>
                                </td>
                                <td className="row-table-height">
                                    <p className="row-table">{orderDetail?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
                                </td>
                                <td className="row-table-height" style={{width: "7rem"}}>
                                    {/*<p className="row-table"><i*/}
                                    {/*    className="bi bi-exclamation-circle text-info"></i></p>*/}
                                    <div className="row-table" style={{marginBottom: "1rem"}}>
                                        <NavLink to={`/product/detail/${orderDetail?.productId}`}>
                                            <button className="btn btn-success">Mua lại</button>
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