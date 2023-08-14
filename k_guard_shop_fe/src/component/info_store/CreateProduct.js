import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import * as ProductService from "../../service/ProductService";
import {toast} from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

export default function CreateProduct() {
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        gender: "",
        username: "",
        password: "",
        email: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        console.log(customer)
    }, [customer])
    return (
        <div className="row mt-4" style={{height: "100vh", display: "flex"}}>
            <div className="col-md-1"></div>
            <div className="col-md-10">
                <Formik
                    initialValues={{
                        id: "",
                        name: "",
                        description: "",
                        price: "",
                        quantity: 0,
                        brand: "",
                        productType: "",
                        sizes: "",
                        images: []
                    }}
                    validationSchema={yup.object({
                        // name: yup.string().required("Tên không được để trống"),
                        // address: yup.string().required("Địa chỉ không được để trống"),
                        // phoneNumber: yup.string().required("Số điện thoại không được để trống"),
                        // gender: yup.number().required("Vui lòng chọn giới tính")
                        //     .min(0, "Vui lòng chọn giới tính hợp lệ")
                        //     .max(2, "Vui lòng chọn giới tính hợp lệ"),
                        // username: yup.string().required("Tên đăng nhập không được để trống"),
                        // password: yup.string().required("Mật khẩu không được để trống"),
                        // confirmPassword: yup.string().required("Mật khẩu không được để trống"),
                        // email: yup.string().required("Email không được để trống")
                    })}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        console.log(values)
                        // const newValue = {
                        //     ...values,
                        //     userDTO: {
                        //         id: "",
                        //         username: values.username,
                        //         password: values.password,
                        //         confirmPassword: values.confirmPassword
                        //     }
                        // }
                        // console.log(newValue)
                        // try {
                        //     await ProductService.saveCustomer(newValue);
                        //     navigate("/login")
                        //     toast.success("Đăng ký tài khoản thành công.")
                        // } catch (e) {
                        //     await setCustomer({
                        //         ...customer,
                        //         name: e.response.data.name || "",
                        //         address: e.response.data.address || "",
                        //         phoneNumber: e.response.data.phoneNumber || "",
                        //         gender: e.response.data.gender || "",
                        //         username: e.response.data.username || "",
                        //         password: e.response.data.password || "",
                        //         email: e.response.data.email || ""
                        //     })
                        // } finally {
                        //     setSubmitting(false)
                        // }
                    }}
                >
                    {
                        ({isSubmitting}) => (
                            <Form>
                                <div className="row card1" style={{
                                    border: "1px solid gray",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    display: "grid",
                                    alignItems: "center"
                                }}>
                                    <div className="col-md-12 d-flex flex-column">
                                                <span
                                                    className="login ms-0 col-md-12 justify-content-center d-flex"><h3>Thêm mới sản phẩm</h3></span>
                                    </div>
                                    <div className="col-md-12 input-field d-flex flex-column mt-3">
                                        <div className="row d-flex height-row">
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="name"><b>Tên sản phẩm</b></label>
                                                <Field className="form-control " id="name" name="name"
                                                       style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="name" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.name !== "" ?
                                                        <p className="text-danger">{customer.name}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="price"><b>Giá</b></label>
                                                <Field className="form-control " id="price" name="price"
                                                       type="number"
                                                       style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="price" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.price !== "" ?
                                                        <p className="text-danger">{customer.price}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="quantity"><b>Số lượng</b></label>
                                                <Field className="form-control " id="quantity"
                                                       name="quantity"
                                                       type="text"
                                                       style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="quantity" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.quantity !== "" ?
                                                        <p className="text-danger">{customer.quantity}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex height-row">
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="productType"><b>Loại sản phẩm</b></label>
                                                <Field className="form-control " id="productType" name="productType"
                                                       style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="productType" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.productType !== "" ?
                                                        <p className="text-danger">{customer.productType}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0"
                                                       htmlFor="brand"><b>Thương hiệu</b></label>
                                                <Field className="form-control " id="brand" name="brand"
                                                       style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="brand" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.brand !== "" ?
                                                        <p className="text-danger">{customer.brand}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="size"><b>Sizes</b></label>
                                                <Field className="form-control " id="size"
                                                       name="size"
                                                       style={{height: "4vh"}}
                                                       placeholder=" "/>
                                                <ErrorMessage name="size" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.size !== "" ?
                                                        <p className="text-danger">{customer.size}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex height-row">
                                            <div className="col-md-8">
                                                <label className="mt-1 mb-0" htmlFor="description"><b>Mô tả</b></label>
                                                <Field className="form-control " id="description" name="description"
                                                       placeholder=""/>
                                                <ErrorMessage name="description" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.description !== "" ?
                                                        <p className="text-danger">{customer.description}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="image"><b>Hình ảnh</b></label>
                                                <Field as="select" className="form-control " id="image"
                                                       name="image"
                                                       placeholder="">
                                                    <option value={0}>Nam</option>
                                                    <option value={1}>Nữ</option>
                                                    <option value={2}>Khác</option>
                                                </Field>
                                                <ErrorMessage name="image" component="p"
                                                              className="text-danger"/>
                                                {
                                                    customer.image !== "" ?
                                                        <p className="text-danger">{customer.image}</p>
                                                        :
                                                        <p>&nbsp;</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row d-flex"
                                             style={{
                                                 cursor: isSubmitting ? "pointer" : "",
                                                 borderRadius: isSubmitting ? "5px" : "",
                                                 // opacity: isSubmitting ? "30%" : "",
                                                 pointerEvents: isSubmitting ? "none" : ""
                                             }}
                                        >
                                            <div className="col-md-5"></div>
                                            {/*<div className="col-md-3">*/}
                                            {/*    <Link to="/info-store" className="col-md-12 p-0">*/}
                                            {/*        <button*/}
                                            {/*            style={{cursor: "pointer", borderRadius: "5px"}}*/}
                                            {/*            className=" login-button">*/}
                                            {/*            Quay lại*/}
                                            {/*        </button>*/}
                                            {/*    </Link>*/}
                                            {/*</div>*/}
                                            <div className="col-md-2">
                                                <button
                                                    style={{cursor: "pointer", borderRadius: "5px"}}
                                                    className=" login-button"
                                                type="submit">
                                                    {
                                                        isSubmitting ?
                                                            <PulseLoader
                                                                className="d-flex align-items-center justify-content-center"
                                                                color="#F4882F" size={10} margin={10}/>
                                                            :
                                                            "Thêm"
                                                    }
                                                </button>
                                            </div>
                                            <div className="col-md-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <div className="col-md-1"></div>
        </div>
    )
}