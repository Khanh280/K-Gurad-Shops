import React, {useEffect, useState} from "react";
import * as OrderService from "../../service/OrdersService"
import "../../css/cart.css"
import Swal from "sweetalert2";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import moment from "moment";
export default function OrderList() {
    const [orders, setOrder] = useState()
    const token = localStorage.getItem("token")
    const [totalPages, setTotalPage] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [nameSearch, setNameSearch] = useState("")
    const [orderBy, setOrderBy] = useState("")
    const navigate = useNavigate();
    const getAllOrder = async (page, nameSearch, orderBy) => {
        const res = await OrderService.getAllOrder(page)
        if (res !== null) {
            setOrder(() => res.data.content)
            setTotalPage(res.data.totalPages)
        }
        setCurrentPage(() => page)
        setNameSearch(() => nameSearch)
        setOrderBy(() => orderBy)
    }
    const detail = async (product) => {
        Swal.fire({
            icon: "info",
            title: "Chi tiết sản phẩm",
            html: `
            
            `,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Quay lại',
            reverseButtons: true,
        })
    }
    const pagination = () => {
        const page = [];
        for (let i = 0; i < totalPages; i++) {
            const isCurrentPage = currentPage === i;
            const className = isCurrentPage ? "activePagination" : "pagination"
            page.push(
                <li className={className} onClick={() => getAllOrder(i, nameSearch, orderBy)}><span
                    className="d-flex align-items-center">{i + 1}</span></li>
            )
        }
        return page;
    }
    const confirmDelete = (id, name) => {
        Swal.fire({
            icon: "error",
            title: `Bạn có xác nhận xóa sản phẩm 
                        <p style="color: red;margin-bottom: -2rem">${name}</p> 
            không?
             `,
            confirmButtonText: "Có",
            cancelButtonText: "Không",
            showConfirmButton: true,
            showCancelButton: true,
            reverseButtons: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await axios.delete("http://localhost:8080/api/product/" + id, {
                        headers: {
                            "Content-Type": "text/plain",
                            "Authorization": "Bearer " + token
                        }
                    })
                    await toast.success("Xóa sản phẩm thành công")
                    await getAllOrder(currentPage,nameSearch,orderBy)
                } catch (e) {
                    toast.error("Xóa sản phẩm thất bại")
                }
            }
        })
    }
    const resetFieldName = (resetForm) => {
        resetForm(); // Reset the form
    };
    useEffect(() => {
        getAllOrder(currentPage, nameSearch, orderBy)
    }, [])
    if (!orders) {
        return null;
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                    <Formik
                        initialValues={{
                            nameSearch: ""
                        }}
                        onSubmit={(values) => {
                            const search = async () => {
                                getAllOrder(0, values.nameSearch.trim(), orderBy)
                            }
                            search()

                        }}>
                        {({resetForm}) => (
                            <Form>
                                <div className="mb-2 d-flex " style={{position: "relative"}}>
                                    <Field name="nameSearch" className="form-control" type="text"
                                           style={{width: "100%", borderRadius: "5px"}}
                                           placeholder="Tên sản phẩm"/><span className="cancel-search"
                                                                             onClick={() => resetFieldName(resetForm)}
                                ><i
                                    className="bi bi-x-circle-fill"></i></span>
                                    <button type="submit"
                                            className="btn bg-dark text-light align-items-center d-flex ms-2">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <select className="form-control w-25" style={{height: "2.7rem"}} name="" id=""
                            onChange={(event) => getAllOrder(0, nameSearch, event.target.value)}
                    >
                        <option value="new">Sản phẩm mới nhất</option>
                        <option value="a-z">Sắp xếp A-Z</option>
                        <option value="priceAscending">Giá tăng dần</option>
                        <option value="priceDescending">Giá giảm dần</option>
                    </select>
                </div>
                <table className="col-md-12">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên khách hàng</th>
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
                                    <p className="my-2">{index +1}</p>
                                </td>
                                <td className="">
                                    <p className="my-2">{order?.customerName}</p>
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
                                        <NavLink to={`/info-store/order-detail/${order.id}`}>
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

            <div className="col-md-12 d-flex justify-content-end mt-1">
                <ul className="d-flex">
                    {
                        currentPage === 0 ?
                            ""
                            :
                            <li className=" pagination" style={{width: "3rem"}}
                                onClick={() => getAllOrder(currentPage - 1)}>Trước</li>
                    }
                    {
                        pagination()
                    }
                    {
                        currentPage === totalPages - 1 ?
                            ""
                            :
                            <li className="pagination" style={{width: "3rem"}}
                                onClick={() => getAllOrder(currentPage + 1)}>Sau</li>
                    }
                </ul>
                {/*<button className="btn btn-sm btn-primary" style={{width:"3rem"}}>Trước</button>*/}
                {/*<button className="btn btn-sm btn-primary" style={{width:"3rem"}}>Sau</button>*/}
            </div>
        </>
    )

}