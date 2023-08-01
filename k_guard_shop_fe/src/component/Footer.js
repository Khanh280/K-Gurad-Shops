import React from "react";
import "bootstrap/dist/css/bootstrap-grid.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/footer.css"

export default function Footer() {
    return (
        <>
            <div className="">
                <div id="footer" className="d-flex col-md-12 px-5">
                    <div className="col-md-4 mt-3 justify-content-center d-flex">
                        <div id="info">
                            <div className="row">
                                <b className="col-md-12">Theo dõi K-Guard trên</b>
                                <i className="bi icons-footer bi-facebook"><span className="icon"> Facebook</span></i>
                                <i className="bi icons-footer bi-instagram"><span className="icon"> Instagram</span></i>
                                <i className="bi icons-footer bi-youtube"><span className="icon"> Youtube</span></i>
                                <i className="bi icons-footer bi-tiktok"><span className="icon"> Tiktok</span></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3  justify-content-center d-flex">
                        <div id="contact">
                            <div className="row">
                                <b className="col-md-12 d-flex">Chính sách</b>
                                <i className="bi icons-footer bi-caret-right"><span className="icon"> Quy định chung</span></i>
                                <i className="bi icons-footer bi-caret-right"><span
                                    className="icon"> Chính sách bảo mật</span></i>
                                <i className="bi icons-footer bi-caret-right"><span
                                    className="icon"> Hướng dẫn mua hàng</span></i>
                                <i className="bi icons-footer bi-caret-right"><span
                                    className="icon"> Giao nhận / Vận chuyển</span></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3 justify-content-center d-flex">
                        <div id="contact">
                            <div className="row">
                                <b className="col-md-12 d-flex">Thông tin cửa hàng</b>
                                <i className="bi icons-footer bi-stopwatch"><span className="icon"> Giờ làm việc từ 8h00 - 22h00 mỗi ngày</span></i>
                                <i className="bi icons-footer bi-envelope-at"><span
                                    className="icon"> kguardshop28@gmail.com.vn</span></i>
                                <i className="bi icons-footer bi-telephone-x"><span
                                    className="icon"> 0338 41 0349 - Khánh</span></i>
                                <i className="bi icons-footer bi-geo-alt"><span className="icon">An Lương, Duy Hải, Duy Xuyên, Quảng Nam</span></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 justify-content-center align-items-center d-flex" style={{height: "5vh",backgroundColor: "rgba(201,201,201,0.51)"}}>
                    Copyright © 2018 K-Guard. All rights reserved. Design by Kiều Quốc Khánh
                </div>
            </div>
        </>

    )
}