import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as ProductService from "../service/ProductService";
import * as yup from "yup";
import PulseLoader from "react-spinners/PulseLoader";

export default function RegisterForm() {
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        gender: "",
        username: "",
        password: "",
        email: ""

    })
    useEffect(() => {
        console.log(customer)
    }, [customer])
    return (
        <div style={{backgroundImage: "url(/anh/moto-login.jpg)", backgroundSize: "100vw", marginTop: "3vh"}}>
            <div className="container">
                <div className="row" style={{height: "100vh", display: "flex", alignItems: "center"}}>
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <Formik
                            initialValues={{
                                id: "",
                                name: "",
                                address: "",
                                phoneNumber: "",
                                gender: 0,
                                username: "",
                                password: "",
                                email: ""
                            }}
                            // validationSchema={}
                            onSubmit={async (values, {setSubmitting}) => {
                                const newValue = {
                                    ...values,
                                    userDTO: {
                                        id: "",
                                        username: values.username,
                                        password: values.password
                                    }
                                }
                                console.log(newValue)
                                try {
                                    await ProductService.saveCustomer(newValue);
                                } catch (e) {
                                    await setCustomer({
                                        ...customer,
                                        name: e.response.data.name || "",
                                        address: e.response.data.address || "",
                                        phoneNumber: e.response.data.phoneNumber || "",
                                        gender: e.response.data.gender || "",
                                        username: e.response.data.username || "",
                                        password: e.response.data.password || "",
                                        email: e.response.data.email || ""
                                    })
                                } finally {
                                    setSubmitting(false)
                                }
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
                                                    className="login ms-0 col-md-12 justify-content-center d-flex"><h3>Đăng ký tài khoản</h3></span>
                                            </div>
                                            <div className="col-md-12 input-field d-flex flex-column mt-3">
                                                <div className="row d-flex height-row">
                                                    <div className="col-md-4">
                                                        <label className="mt-1 mb-0" htmlFor="username"><b>Tên đăng
                                                            nhập</b></label>
                                                        <Field className="form-control " id="username" name="username"
                                                               style={{height: "4vh"}}
                                                               placeholder=" "/>
                                                        {
                                                            customer.username !== "" ?
                                                                <p className="text-danger">{customer.username}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className=" mt-1 mb-0" htmlFor="password"><b>Mật khẩu</b></label>
                                                        <Field className="form-control " id="password" name="password"
                                                               style={{height: "4vh"}}
                                                               placeholder=" "/>
                                                        {
                                                            customer.password !== "" ?
                                                                <p className="text-danger">{customer.password}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="mt-1 mb-0" htmlFor="confirmPassword"><b>Xác
                                                            nhận lại
                                                            mật
                                                            khẩu</b></label>
                                                        <Field className="form-control " id="confirmPassword"
                                                               style={{height: "4vh"}}
                                                               placeholder=" "/>
                                                        {
                                                            customer.password !== "" ?
                                                                <p className="text-danger">{customer.password}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row d-flex height-row">
                                                    <div className="col-md-4">
                                                        <label className="mt-1 mb-0" htmlFor="name"><b>Họ và
                                                            Tên</b></label>
                                                        <Field className="form-control " id="name" name="name"
                                                               style={{height: "4vh"}}
                                                               placeholder=" "/>
                                                        {
                                                            customer.name !== "" ?
                                                                <p className="text-danger">{customer.name}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className=" mt-1 mb-0"
                                                               htmlFor="email"><b>Email</b></label>
                                                        <Field className="form-control " id="email" name="email"
                                                               style={{height: "4vh"}}
                                                               placeholder=" "/>
                                                        {
                                                            customer.email !== "" ?
                                                                <p className="text-danger">{customer.email}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className=" mt-1 mb-0" htmlFor="phoneNumber"><b>Số điện
                                                            thoại</b></label>
                                                        <Field className="form-control " id="phoneNumber"
                                                               name="phoneNumber"
                                                               style={{height: "4vh"}}
                                                               placeholder=" "/>
                                                        {
                                                            customer.phoneNumber !== "" ?
                                                                <p className="text-danger">{customer.phoneNumber}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row d-flex height-row">
                                                    <div className="col-md-8">
                                                        <label className="mt-1 mb-0" htmlFor="address"><b>Địa
                                                            chỉ</b></label>
                                                        <Field className="form-control " id="address" name="address"
                                                               placeholder=""/>
                                                        {
                                                            customer.address !== "" ?
                                                                <p className="text-danger">{customer.address}</p>
                                                                :
                                                                <p>&nbsp;</p>
                                                        }
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="mt-1 mb-0" htmlFor="gender"><b>Giới
                                                            tính</b></label>
                                                        <Field as="select" className="form-control " id="gender"
                                                               name="gender"
                                                               placeholder="">
                                                            <option value="0">Nam</option>
                                                            <option value="1">Nữ</option>
                                                            <option value="2">Khác</option>
                                                        </Field>
                                                        {
                                                            customer.gender !== "" ?
                                                                <p className="text-danger">{customer.gender}</p>
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
                                                    <div className="col-md-3"></div>
                                                    <div className="col-md-3">
                                                        <Link to="/login" className="col-md-12 p-0">
                                                            <button
                                                                style={{cursor: "pointer", borderRadius: "5px"}}
                                                                className=" login-button">
                                                                Đăng nhập
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button
                                                            style={{cursor: "pointer", borderRadius: "5px"}}
                                                            className=" login-button">
                                                            {
                                                                isSubmitting ?
                                                                    <PulseLoader
                                                                        className="d-flex align-items-center justify-content-center"
                                                                        color="#F4882F" size={10} margin={10}/>
                                                                    :
                                                                    "Đăng ký"
                                                            }
                                                        </button>
                                                    </div>
                                                    <div className="col-md-3"></div>
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
            </div>
        </div>
    )
}