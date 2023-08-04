import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.css"
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function LoginForm() {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div style={{backgroundImage: "url(/anh/moto-login.jpg)", backgroundSize: "100vw", marginTop: "3vh"}}>
                <div className="container">
                    <div className="row" style={{height: "100vh", display: "flex", alignItems: "center"}}>
                        <div className="col-md-1"></div>
                        <div className="col-md-10 card1" style={{
                            border: "1px solid gray",
                            borderRadius: "10px",
                            padding: "15px",
                            backgroundColor: "rgba(255,255,255,0.85)",
                            display: "grid",
                            alignItems: "center"
                        }}>
                            <div className="row" style={{}}>
                                <div id="image-login" className="col-md-5">
                                    <img
                                        src="/anh/KGuard3.png"
                                        height={370}
                                        width={370}
                                        style={{borderRadius: "10px"}}
                                        alt=""/>
                                </div>
                                <div className="col-md-7" style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex"

                                }}>
                                    <Formik
                                        initialValues={{
                                            username: "",
                                            password: ""
                                        }}
                                        onSubmit={async (values) => {
                                            try {
                                                const response = await axios.post("http://localhost:8080/api/user/authenticate", values)
                                                if (response.data.token) {
                                                    localStorage.setItem("token", response.data.token);
                                                    localStorage.setItem("username", response.data.username);
                                                    localStorage.setItem("role", response.data.role);
                                                }
                                                await navigate("/");
                                            } catch (e) {
                                                toast.error("Đăng nhập thất bại.")
                                            }
                                        }}
                                    >
                                        <Form>
                                            <div className="row">
                                                <div className="col-md-12 d-flex flex-column">
                                                    <span
                                                        className="login ms-0 col-md-12 justify-content-center d-flex">Đăng nhập</span>{" "}
                                                </div>
                                                <div className="col-md-12 input-field d-flex flex-column mt-3">
                                                    {" "}
                                                    <label className="pb-1" htmlFor="username"><b>Tên đăng
                                                        nhập</b></label>{" "}
                                                    <Field className="form-control" id="username" name="username"
                                                           style={{height: "4vh"}} placeholder=""/>{" "}
                                                    <label className="mt-3 pb-1" htmlFor="password"><b>Mật
                                                        khẩu</b></label>{" "}
                                                    <Field className="form-control" type="password" id="password"
                                                           name="password" style={{height: "4vh"}} placeholder=""/>{" "}
                                                    <div className="mt-3 text1 justify-content-between d-flex">
                                                        {" "}
                                                        <div>
                                                            <input type="checkbox" id="miss-user"/><label
                                                            htmlFor="miss-user" style={{cursor: "pointer"}}> Nhớ tài
                                                            khoản</label>
                                                        </div>
                                                        <div>
                                                            <b className=" " style={{cursor: "pointer"}}>Quên mật
                                                                khẩu?</b>{" "}
                                                        </div>
                                                    </div>
                                                    <div className="text2 mt-4 d-flex flex-row align-items-center">
                                                        {" "}
                                                        <label>
                                                            Bạn chưa có tài khoản?
                                                            <Link to="/register" className=""
                                                                  style={{textDecoration: "none"}}><b className="ms-1">Đăng
                                                                ký tại đây.</b></Link>
                                                        </label>{" "}
                                                    </div>
                                                    <button type="submit"
                                                            style={{cursor: "pointer", borderRadius: "5px"}}
                                                            className="mt-4 login-button">
                                                        Đăng nhập ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}