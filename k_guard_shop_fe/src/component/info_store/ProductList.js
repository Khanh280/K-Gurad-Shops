import React, {useEffect, useState} from "react";
import * as ProductService from "../../service/ProductService"
import "../../css/cart.css"
import Swal from "sweetalert2";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {Field, Form, Formik} from "formik";

export default function ProductList() {
    const [products, setProduct] = useState()
    const token = localStorage.getItem("token")
    const [totalPages, setTotalPage] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [nameSearch, setNameSearch] = useState("")
    const [orderBy, setOrderBy] = useState("")
    const navigate = useNavigate();
    const getAllProduct = async (page,nameSearch,orderBy) => {
        const res = await ProductService.getAllProductManager(page,nameSearch,orderBy);
        if (res !== null) {
            setProduct(() => res.data.content)
            setTotalPage(res.data.totalPages)
        }
        setCurrentPage(() => page)
        setNameSearch(()=>nameSearch)
        setOrderBy(()=>orderBy)
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
                <li className={className} onClick={() => getAllProduct(i,nameSearch,orderBy)}><span
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
                    toast.success("Xóa sản phẩm thành công")
                    getAllProduct()
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
        getAllProduct(currentPage,nameSearch,orderBy)
    }, [])
    if (!products) {
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
                              getAllProduct(0,values.nameSearch.trim(),orderBy)
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
                    <select className="form-control w-25" style={{height:"2.7rem"}} name="" id=""
                            onChange={(event) => getAllProduct(0, nameSearch, event.target.value)}
                    >
                        <option value="new">Sản phẩm mới nhất</option>
                        <option value="a-z">Sắp xếp A-Z</option>
                        <option value="priceAscending">Giá tăng dần</option>
                        <option value="priceDescending">Giá giảm dần</option>
                    </select>
                </div>
                <table className="table-hover p-0 m-0">
                    <thead>
                    <tr>
                        <th colSpan={2}>Sản phẩm</th>
                        <th>Loại</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products !== null ?

                            products.map((product, index) =>
                                <tr className="row-table-height" key={index}>
                                    <td className="row-table-height"><img src={product?.linkImage} alt=""
                                                                          style={{width: "5rem"}}/>
                                        {" "}
                                        {product?.name}
                                    </td>
                                    <td className="row-table-height"><p
                                        className="row-table">{product?.brand}</p></td>
                                    <td className="row-table-height"><p
                                        className="row-table">{product?.productType}</p>
                                    </td>
                                    <td className="row-table-height"><p
                                        className="row-table">{product?.quantity}</p>
                                    </td>
                                    <td className="row-table-height"><p
                                        className="row-table">{product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                    </td>
                                    <td>
                                        <div style={{height: "5rem"}} className="align-items-center d-flex">
                                            <NavLink to={`/product/detail/${product.id}`}
                                                     className="btn btn-info d-flex align-items-center justify-content-center"
                                                     style={{width: "2rem", height: "2rem"}}>
                                                <i className="bi bi-info-square" title="Chi tiết"></i></NavLink>
                                            <button
                                                className="btn btn-warning ms-1 d-flex align-items-center justify-content-center"
                                                style={{width: "2rem", height: "2rem"}}><i
                                                className="bi bi-pencil-square" title="Chỉnh sửa"></i></button>
                                            <button
                                                className="btn btn-danger ms-1 d-flex align-items-center justify-content-center"
                                                style={{width: "2rem", height: "2rem"}}
                                                onClick={() => confirmDelete(product.id, product.name)}
                                            >
                                                <i className="bi bi-trash"
                                                   title="Xóa"></i>
                                            </button>
                                        </div>
                                        {/*<div className="">*/}
                                        {/*    <button>*/}
                                        {/*        <i className="bi bi-pencil-square"></i>*/}
                                        {/*    </button>*/}
                                        {/*    <i className="bi bi-trash row-table"></i>*/}
                                        {/*</div>*/}
                                    </td>
                                </tr>
                            )
                            :
                            ""
                    }
                    </tbody>
                </table>
            </div>

            <div className="col-md-12 d-flex justify-content-end">
                <ul className="d-flex">
                    {
                        currentPage === 0 ?
                            ""
                            :
                            <li className=" pagination" style={{width: "3rem"}}
                                onClick={() => getAllProduct(currentPage - 1)}>Trước</li>
                    }
                    {
                        pagination()
                    }
                    {
                        currentPage === totalPages - 1 ?
                            ""
                            :
                            <li className="pagination" style={{width: "3rem"}}
                                onClick={() => getAllProduct(currentPage + 1)}>Sau</li>
                    }
                </ul>
                {/*<button className="btn btn-sm btn-primary" style={{width:"3rem"}}>Trước</button>*/}
                {/*<button className="btn btn-sm btn-primary" style={{width:"3rem"}}>Sau</button>*/}
            </div>
        </>
    )

}