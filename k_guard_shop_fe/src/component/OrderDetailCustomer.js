import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as OrderService from "../service/OrdersService"
import {Field, Form, Formik} from "formik";

export default function OrderDetailCustomer() {
    const [orderDetails, setOrderDetail] = useState()
    const [totalPages, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const param = useParams()
    const getAllOrderDetail = async (page, orderId) => {
        const res = await OrderService.getAllOrderDetailCustomer(page, orderId)
        setOrderDetail(() => res.data.content)
    }
    const pagination = () => {
        const page = [];
        for (let i = 0; i < totalPages; i++) {
            const a = currentPage === i;
            const className = a ? "activePagination" : "pagination"
            page.push(
                <li className={className} onClick={() => getAllOrderDetail(i,param.id)}>{i + 1}</li>
            )
        }
        return page;
    }
    const resetFieldName = (resetForm) => {
        resetForm(); // Reset the form
    };
    useEffect(() => {
        getAllOrderDetail(0, param.id)
    }, [])
    if (!orderDetails) {
        return null;
    }
    return (
        <>
            <div className="container">
                <div className="row  justify-content-center">
                    <div className=" col-md-5">
                        <Formik
                            initialValues={{
                                name: ""
                            }}
                            onSubmit={(values) => {
                                // const search = async () => {
                                //     await getAllProduct(types, orderBy, brand.brand, values.name.trim())
                                //     await setPage(() => 0)
                                //     await setType("")
                                //     await setNameSearch(values.name.trim())
                                // }
                                // search()
                                console.log("asd")
                            }}>
                            {({resetForm}) => (
                                <Form>
                                    <div className="mb-2 d-flex " style={{position: "relative"}}>
                                        <Field name="name" className="form-control" type="date"
                                               style={{width: "100%", borderRadius: "5px"}}
                                               placeholder="Tên sản phẩm"/><span className="cancel-search"
                                                                                 onClick={() => resetFieldName(resetForm)}>
                                        {/*<i className="bi bi-x-circle-fill"></i>*/}
                                    </span>
                                        <button type="submit"
                                                className="btn bg-dark text-light align-items-center d-flex ms-2">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 justify-content-center d-flex" style={{
                        border: "1px solid #80808096",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 6px 4px #80808096"
                    }}>
                        <table className="col-md-9">
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
                        <div className="justify-content-end d-flex">
                            <ul className="d-flex">
                                {
                                    currentPage !== 0 ?
                                        <li className="pagination"
                                            onClick={() => getAllOrderDetail(currentPage - 1,param.id)}>Trước
                                        </li> : ""
                                }
                                {
                                    pagination()
                                }
                                {
                                    currentPage === totalPages - 1 ?
                                        <li className="pagination"
                                            onClick={() => getAllOrderDetail(currentPage + 1,param.id)}>Sau</li>
                                        : ""
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>

        </>
    )
}