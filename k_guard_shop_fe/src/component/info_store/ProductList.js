import React, {useEffect, useState} from "react";
import * as ProductService from "../../service/ProductService"
import "../../css/cart.css"
import Swal from "sweetalert2";

export default function ProductList() {
    const [products, setProduct] = useState()
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct();
        setProduct(() => res.data.content)
    }
    const detail = async (product)=>{
        Swal.fire({
            icon: "info",
            title: "Chi tiết sản phẩm",
            html:  `
            <input/>
            `,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Quay lại',
            reverseButtons: true,
        })
    }
    useEffect(() => {
        getAllProduct()
    }, [])
    if (!products) {
        return null;
    }
    return (
        <>
            <div className="row">
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
                        products.map((product, index) =>
                            <tr className="row-table-height" key={index}>
                                <td className="row-table-height"><img src={product?.linkImage} alt=""
                                                                      style={{width: "5rem"}}/>
                                    {" "}
                                    {product?.name}
                                </td>
                                <td className="row-table-height"><p className="row-table">{product?.brand}</p></td>
                                <td className="row-table-height"><p className="row-table">{product?.productType}</p>
                                </td>
                                <td className="row-table-height"><p className="row-table">{product?.quantity}</p></td>
                                <td className="row-table-height"><p
                                    className="row-table">{product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                                </td>
                                <td>
                                    <div style={{height: "5rem"}} className="align-items-center d-flex">
                                        <button
                                            className="btn btn-info d-flex align-items-center justify-content-center"
                                            style={{width: "2rem", height: "2rem"}} onClick={()=> detail()}>
                                            <i className="bi bi-info-square" title="Chi tiết"></i></button>
                                        <button
                                            className="btn btn-warning ms-1 d-flex align-items-center justify-content-center"
                                            style={{width: "2rem", height: "2rem"}}><i
                                            className="bi bi-pencil-square" title="Chỉnh sửa" ></i></button>
                                        <button
                                            className="btn btn-danger ms-1 d-flex align-items-center justify-content-center"
                                            style={{width: "2rem", height: "2rem"}}><i className="bi bi-trash" title="Xóa"></i>
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
                    }
                    </tbody>
                </table>
            </div>
        </>
    )

}