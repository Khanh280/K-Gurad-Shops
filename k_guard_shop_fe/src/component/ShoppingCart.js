import React, {useEffect, useState} from "react";
import "../css/cart.css"
import {Form, Formik, Field} from "formik";

export default function ShoppingCart() {
    const [shoppingCart, setShoppingCarts] = useState(10)
    const [quantity, setQuantity] = useState(1);
    const fora = () => {
        const cart = [];
        for (let i = 0; i < shoppingCart; i++) {
            cart.push(
                <tr className="row-table-height">
                    <td className="row-table-height">
                        <p className="row-table">1</p>
                    </td>
                    <td className="row-table-height">
                        <img
                            src="https://twomotion.net/wp-content/uploads/2020/06/AGV-Pista-GP-R-Limited.png"
                            style={{width: "5rem"}}/>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">AGV Pista soleluna 2022</p>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">SP-0001</p>
                    </td>
                    <td className="row-table-height">
                        <p className="row-table">Nón fullface</p>
                    </td>
                    <td className="row-table-height">
                        <div className="row-table d-flex">
                            <button className="btn btn-dark btn-operator-plus"
                                    onClick={() => setQuantity(prevState => prevState - 1)}><span
                                style={{fontWeight: "bold"}}>-</span></button>
                            <input id="input-quantity-product" className="form-control" type="text" readOnly
                                   value={quantity}/>
                            <button className="btn btn-dark btn-operator-subs"
                                    onClick={() => setQuantity(prevState => prevState + 1)}><span
                                style={{fontWeight: "bold"}}>+</span></button>
                        </div>
                    </td>
                    <td className="row-table-height">
                        <div className="row-table">
                            {/*<button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i*/}
                            {/*    className="bi bi-pencil" title="Chỉnh sửa"></i></button>*/}
                            <i className="bi bi-x" style={{cursor:"pointer"}} title="Xóa"></i>
                        </div>
                    </td>
                </tr>)
        }
        return cart;
    }
    useEffect(() => {
        window.scrollTo(0,0)
        console.log("mount")
        return () => {
            console.log("unmount")
        }
    }, [])
    return (
        <>
            <div className="px-4" style={{marginTop: "13vh"}}>
                <div className="d-flex">
                    <div className="col-md-9 ">
                        <div className="" align="center">
                            <h4>Danh sách sản phẩm </h4>
                        </div>

                        <table className="col-md-12 table ">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Mã sản phẩm</th>
                                <th>Loại</th>
                                <th>Số lượng</th>
                                <th>Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*<tr className="row-table-height">*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <p className="row-table">1</p>*/}
                            {/*    </td>*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <img*/}
                            {/*            src="https://twomotion.net/wp-content/uploads/2020/06/AGV-Pista-GP-R-Limited.png"*/}
                            {/*            style={{width: "5rem"}}/>*/}
                            {/*    </td>*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <p className="row-table">AGV Pista soleluna 2022</p>*/}
                            {/*    </td>*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <p className="row-table">SP-0001</p>*/}
                            {/*    </td>*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <p className="row-table">Nón fullface</p>*/}
                            {/*    </td>*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <p className="row-table">3</p>*/}
                            {/*    </td>*/}
                            {/*    <td className="row-table-height">*/}
                            {/*        <div className="row-table">*/}
                            {/*            <button className="btn btn-sm btn-cart btn-warning" title="Chỉnh sửa"><i*/}
                            {/*                className="bi bi-pencil" title="Chỉnh sửa"></i></button>*/}
                            {/*            <button className="btn btn-sm btn-cart btn-danger ms-1" title="Xóa"><i*/}
                            {/*                className="bi bi-trash" title="Xóa"></i></button>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {
                                fora()
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
                                onSubmit={(values) => {
                                    console.log("sdfds")
                                }}>
                                <Form className="mb-2">
                                    <div className="d-flex">
                                        <label className="radio col-md-3">
                                            <input type="radio" name="card" defaultValue="payment" defaultChecked=""/>
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
                                            <span>3000đ</span>
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
                                                <button className="btn login-button">Đặt hàng</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}