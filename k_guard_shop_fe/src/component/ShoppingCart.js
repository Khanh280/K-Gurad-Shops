import React from "react";
import "../css/cart.css"
import {Form, Formik} from "formik";

export default function ShoppingCart() {
    return (
        <>
            <div className="container" style={{marginTop: "15vh"}}>
                <div className="d-flex">
                    <div className="col-md-8">
                        <div className="" align="center">
                            <h4>Danh sách sản phẩm </h4>
                        </div>
                        <table className="col-md-12 table table-hover">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Loại</th>
                                <th>Số lượng</th>
                                <th>Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        class="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        class="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        className="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        className="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>SP-0001</td>
                                <td>AGV Pista soleluna 2022</td>
                                <td>Nón fullface</td>
                                <td>3</td>
                                <td>
                                    <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i
                                        className="bi bi-pencil" title="Chỉnh sửa"></i></button>
                                    <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i
                                        className="bi bi-trash" title="Xóa"></i></button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-4"
                         style={{minHeight: "40rem", border: "1px solid gray", borderRadius: "5px"}}>

                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <h4>Chi tiết giỏ hàng</h4>
                            <img src="/anh/KGuard.png" alt="" style={{width: "3rem"}}/>
                        </div>

                        <Formik
                            initialValues={{
                                id: ""
                            }}
                            onSubmit={(values) => {
                                console.log("sdfds")
                            }}>
                            <Form>
                                <div className="d-flex">
                                    <label className="radio">
                                        <input type="radio" name="card" defaultValue="payment" defaultChecked=""/>
                                        <span>
                                    <img width={30} src="https://img.icons8.com/color/48/000000/mastercard.png"/>
                                </span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="card" defaultValue="payment"/>
                                        <span>
                                    <img width={30} src="https://img.icons8.com/officel/48/000000/visa.png"/>
                                </span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="card" defaultValue="payment"/>
                                        <span>
                                    <img width={30} src="https://img.icons8.com/ultraviolet/48/000000/amex.png"/>
                                </span>
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="card" defaultValue="payment"/>
                                        <span>
                                    <img width={30} src="https://img.icons8.com/officel/48/000000/paypal.png"/>
                                </span>
                                    </label>
                                </div>

                                <div className="row">
                                    <label htmlFor="" className="mt-3">Tên thẻ</label>
                                    <div className="col-md-12">
                                        <input className="form-control" type="text"/>
                                    </div>
                                    <label htmlFor="" className="mt-3">Số thẻ</label>
                                    <div className="col-md-12">
                                        <input className="form-control" type="text"/>
                                    </div>
                                    <label htmlFor="" className="mt-3">Số điện thoại</label>
                                    <div className="col-md-12">
                                        <input className="form-control" type="text"/>
                                    </div>
                                    <label htmlFor="" className="mt-3">Địa chỉ nhận hàng</label>
                                    <div className="col-md-12">
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                                <hr/>
                                <div className="">
                                    <div className="d-flex justify-content-between mt-1">
                                        <b>Tổng tiền hàng</b>
                                        <span>3000$</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-1">
                                        <b>Phí vận chuyển</b>
                                        <span>3000$</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-1">
                                        <b>Tổng thanh toán:</b>
                                        <span>3000$</span>
                                    </div>
                                    <div className="row mt-3">
                                        <button className="btn login-button">Đặt hàng</button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}