import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as OrdersService from "../service/OrdersService";
import "../css/cart.css"
import {NavLink} from "react-router-dom";
import moment from "moment";

export default function HistoryOrder() {
    const [orders, setOrder] = useState()
    const [totalPages, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const getAllOrderCustomer = async (page) => {
        try {
            const res = await OrdersService.getAllOrderCustomer(page)
            setOrder(() => res.data.content)
            setTotalPage(() => res.data.totalPages)
            setCurrentPage(() => page)
        } catch (e) {

        }

    }
    const pagination = () => {
        const page = [];
        for (let i = 0; i < totalPages; i++) {
            const a = currentPage === i;
            const className = a ? "activePagination" : "pagination"
            page.push(
                <li className={className} onClick={() => getAllOrderCustomer(i)}>{i + 1}</li>
            )
        }
        return page;
    }
    const resetFieldName = (resetForm) => {
        resetForm(); // Reset the form
    };
    useEffect(() => {
        getAllOrderCustomer(0)
    }, [])
    if (!orders) {
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
                    <div className="col-md-10" style={{
                        border: "1px solid #80808096",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 6px 4px #80808096"
                    }}>
                        <table className="col-md-12">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Ngày mua</th>
                                <th>Đơn giá</th>
                                <th className="text-center" style={{width: "15%"}}>Trạng thái</th>
                                <th className="text-center">Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders.map((order,index) =>
                                    <tr>
                                        <td className="">
                                            <p className="my-2">{index}</p>
                                        </td>
                                        <td className="">
                                            <p className="my-2">{order?.createDate.split(" ")[1].replace(".0","")} {moment(order?.createDate.split(" ")[0], 'YYYY/MM/DD').format('DD/MM/YYYY')}</p>
                                        </td>
                                        <td className="">
                                            <p className="my-2">{order?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
                                        </td>
                                        <td className="">
                                            <p className="my-2 d-flex justify-content-center"
                                               style={{
                                                   backgroundColor: order.paymentStatusId === "1" ? "#ffc669": "#a1f5a1",
                                                   borderRadius:  "10px"
                                               }}
                                            >{order?.paymentStatus}</p>
                                        </td>
                                        <td className="text-center">
                                            {/*<p className=""><i*/}
                                            {/*    className="bi bi-exclamation-circle text-info"></i></p>*/}
                                            <div>
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
                        <div className="justify-content-end d-flex">
                            <ul className="d-flex">
                                {
                                    totalPages !== 1 ?
                                        <>
                                            {
                                                currentPage !== 0 ?
                                                    <li className="pagination"
                                                        onClick={() => getAllOrderCustomer(currentPage - 1)}>Trước
                                                    </li> : ""
                                            }
                                            {
                                                pagination()
                                            }
                                            {
                                                currentPage === totalPages - 1 ?
                                                    ""
                                                    :
                                                    <li className="pagination"
                                                        onClick={() => getAllOrderCustomer(currentPage + 1)}>Sau</li>
                                            }
                                        </>
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