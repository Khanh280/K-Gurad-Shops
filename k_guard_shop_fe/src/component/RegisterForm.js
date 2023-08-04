import {Link} from "react-router-dom";
import React from "react";
import {Field, Form, Formik} from "formik";

export default function RegisterForm() {
    return (
        <div style={{backgroundImage: "url(/anh/moto-login.jpg)", backgroundSize: "100vw", marginTop: "3vh"}}>
            <div className="container">
                <div className="row" style={{height: "100vh", display: "flex", alignItems: "center"}}>
                    <div className="col-md-1"></div>
                    <div className="col-md-10 card1" style={{
                        minHeight: "25rem",
                        border: "1px solid gray",
                        borderRadius: "10px",
                        padding: "15px",
                        backgroundColor: "rgba(255,255,255,0.85)",
                        display: "grid",
                        alignItems: "center"
                    }}>
                        <Formik
                            initialValues={{
                                id: "",
                                name: "",
                                address:"",
                                phoneNumber:"",
                                gender: 0,
                                usersName: "",
                                password: "",
                                email: ""
                            }}
                            onSubmit={(values) => {
                                console.log("abc")
                            }}
                        >
                            <Form>
                                <div className="row">
                                    <div className="col-md-12 d-flex flex-column">
                                        <span className="login ms-0 col-md-12 justify-content-center d-flex"><h3>Đăng ký tài khoản</h3></span>
                                    </div>
                                    <div className="col-md-12 input-field d-flex flex-column mt-3">

                                        <div className="row d-flex">
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="username"><b>Tên đăng
                                                    nhập</b></label>
                                                <input className="form-control " id="username" style={{height: "4vh"}}
                                                       placeholder=" "/>
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="password"><b>Mật khẩu</b></label>
                                                <input className="form-control " id="password" style={{height: "4vh"}}
                                                       placeholder=" "/>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="username"><b>Xác nhận lại mật
                                                    khẩu</b></label>
                                                <input className="form-control " id="username" style={{height: "4vh"}}
                                                       placeholder=" "/>
                                            </div>
                                        </div>
                                        <div className="row d-flex">
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="username"><b>Họ và Tên</b></label>
                                                <input className="form-control " id="username" style={{height: "4vh"}}
                                                       placeholder=" "/>
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="password"><b>Email</b></label>
                                                <input className="form-control " id="password" style={{height: "4vh"}}
                                                       placeholder=" "/>
                                            </div>
                                            <div className="col-md-4">
                                                <label className=" mt-1 mb-0" htmlFor="password"><b>Số điện
                                                    thoại</b></label>
                                                <input className="form-control " id="password" style={{height: "4vh"}}
                                                       placeholder=" "/>
                                            </div>
                                        </div>
                                        <div className="row d-flex">
                                            <div className="col-md-8">
                                                <label className="mt-1 mb-0" htmlFor="username"><b>Địa chỉ</b></label>
                                                <Field className="form-control " id="username" name="id"
                                                       placeholder=""/>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="mt-1 mb-0" htmlFor="username"><b>Giới tính</b></label>
                                                <Field as="select" className="form-control " id="username"
                                                       placeholder=" ">
                                                    <option value="">Nam</option>
                                                    <option value="">Nữ</option>
                                                    <option value="">Khác</option>
                                                </Field>
                                            </div>
                                        </div>

                                        {/*<div className="mt-3 text1 justify-content-between d-flex">*/}
                                        {/*    */}
                                        {/*    <div>*/}
                                        {/*        <input type="checkbox" id="miss-user"/><label htmlFor="miss-user" style={{cursor: "pointer"}}> Nhớ tài khoản</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div>*/}
                                        {/*        <b className=" "  style={{cursor: "pointer"}}>Quên mật khẩu?</b>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="text2 mt-4 d-flex flex-row align-items-center">*/}
                                        {/*    */}
                                        {/*    <label>*/}
                                        {/*        Bạn chưa có tài khoản?*/}
                                        {/*        <Link to="/register" className="" style={{textDecoration: "none"}}><b className="ms-1">Đăng ký tại đây.</b></Link>*/}
                                        {/*    </label>*/}
                                        {/*</div>  */}
                                        <div className="row d-flex">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-3">
                                                <Link to="/login" className="col-md-12">
                                                    <button
                                                        style={{cursor: "pointer", borderRadius: "5px"}}
                                                        className="mt-5 login-button">
                                                        Đăng nhập
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col-md-3">
                                                <button
                                                    style={{cursor: "pointer", borderRadius: "5px"}}
                                                    className="mt-5 login-button">
                                                    Đăng ký
                                                </button>
                                            </div>
                                            <div className="col-md-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
    )
}