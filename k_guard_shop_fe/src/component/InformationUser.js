import React, {useEffect, useState} from "react";
import "../css/information_user.css"
import * as CustomerService from "../service/CustomerService"

export default function InformationUser() {
    const [user, setUser] = useState()
    const getCustomer = async () => {
        const res = await CustomerService.getCustomer();
        setUser(() => res.data)
    }
    useEffect(() => {
        getCustomer()
    }, [])
    if (!user) {
        return null;
    }
    return (
        <>
            <div className="px-5 row justify-content-center" style={{marginTop: "12vh", height: "100vh"}}>
                <div className=" mt-5" id="">
                    <div className=" d-flex justify-content-center">
                        <div className="w-75">
                            <div className="card user-card-full" style={{minHeight: "20rem"}}>
                                <div className="row m-l-0 m-r-0" style={{height: "30rem"}}>
                                    <div className="col-sm-4 bg-c-lite-green user-profile" style={{
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img
                                                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                                                    className="img-radius"
                                                    alt="User-Profile-Image"
                                                />
                                            </div>
                                            <h6 className="f-w-600">{user?.name}</h6>
                                            <p>Khách hàng</p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-8" style={{display: "flex", alignItems: "center"}}>
                                        <div className="col-sm-12">
                                            <div className="card-block">
                                                <h3 className="m-b-20 p-b-5 b-b-default f-w-600">
                                                    Thông tin cá nhân
                                                </h3>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{user.email}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Số điện thoại</p>
                                                        <h6 className="text-muted f-w-400">{user.phoneNumber}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                                    Projects
                                                </h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Tên đăng nhập</p>
                                                        <h6 className="text-muted f-w-400">{user.users.username}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Địa chỉ</p>
                                                        <h6 className="text-muted f-w-400">{user.address}</h6>
                                                    </div>
                                                </div>
                                                <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                    <li>
                                                        <a
                                                            href="#!"
                                                            data-toggle="tooltip"
                                                            data-placement="bottom"
                                                            title=""
                                                            data-original-title="facebook"
                                                            data-abc="true"
                                                        >
                                                            <i
                                                                className="mdi mdi-facebook feather icon-facebook facebook"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#!"
                                                            data-toggle="tooltip"
                                                            data-placement="bottom"
                                                            title=""
                                                            data-original-title="twitter"
                                                            data-abc="true"
                                                        >
                                                            <i
                                                                className="mdi mdi-twitter feather icon-twitter twitter"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#!"
                                                            data-toggle="tooltip"
                                                            data-placement="bottom"
                                                            title=""
                                                            data-original-title="instagram"
                                                            data-abc="true"
                                                        >
                                                            <i
                                                                className="mdi mdi-instagram feather icon-instagram instagram"
                                                                aria-hidden="true"
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}