import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import FullFaceHot from "./FullFaceHot";
import "../css/product_detail.css"
export default function DetailProduct() {
    const [quantity, setQuantity] = useState(1);
    const [imagemain, setImageMain] = useState("https://th.bing.com/th/id/OIP.ycxdk81Hf058msVUOTE4YwHaHa?pid=ImgDet&w=900&h=900&rs=1");
    const selectImage = (url) => {
        setImageMain(() => url)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
    }, [imagemain])
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2 align-items-center" style={{height: "3rem"}}>
                    <div className="col-md-4">
                        <Link to="/"><i className="bi bi-house-door" style={{color: "#fff"}}></i></Link> /<NavLink
                        to="/product" className="ms-2 text-light">Sản phẩm / Chi tiết sản phẩm</NavLink>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 p-0 "
                         style={{border: "1px solid #b3b3b33b", borderRadius: "10px", height: "41rem"}}>
                        <div className="row">
                            <img
                                src={imagemain}
                                style={{width: "100%", borderRadius: "20px"}}/>
                        </div>

                        <div className="row m-0" style={{borderTop: "1px solid #b3b3b33b"}}>
                            <div className="col-md-3 image-detail">
                                <img
                                    src="https://th.bing.com/th/id/OIP.ycxdk81Hf058msVUOTE4YwHaHa?pid=ImgDet&w=900&h=900&rs=1"
                                    onClick={() => selectImage("https://th.bing.com/th/id/OIP.ycxdk81Hf058msVUOTE4YwHaHa?pid=ImgDet&w=900&h=900&rs=1")}
                                    style={{width: "100%", cursor: "pointer"}}/>
                            </div>
                            <div className="col-md-3 image-detail">
                                <img
                                    src="https://th.bing.com/th/id/R.10b758fe9dd43ffdceeadec4266be587?rik=PZfQKsdIRwfGsw&pid=ImgRaw&r=0"
                                    onClick={() => selectImage("https://th.bing.com/th/id/R.10b758fe9dd43ffdceeadec4266be587?rik=PZfQKsdIRwfGsw&pid=ImgRaw&r=0")}
                                    style={{width: "100%", cursor: "pointer"}}/>
                            </div>
                            <div className="col-md-3 image-detail">
                                <img
                                    src="https://twomotion.net/wp-content/uploads/2020/06/AGV-Pista-GP-R-Limited.png"
                                    onClick={() => selectImage("https://twomotion.net/wp-content/uploads/2020/06/AGV-Pista-GP-R-Limited.png")}
                                    style={{width: "100%", cursor: "pointer"}}/>
                            </div>
                            <div className="col-md-3 image-detail">
                                <img
                                    src="https://images.motocard.com/eyJidWNrZXQiOiJtb3RvY2FyZCIsImtleSI6InByb2R1Y3RzL2ltYWdlcy8wNzYyMi9hZ3YtcGlzdGFfZ3Bfcl9yb3NzaV93aW50ZXJfdGVzdF8yMDE5X2xpbWl0ZWRfZWRpdGlvbi0yLU0tMDc2MjI2MTM0LmpwZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODV9LCJqcGVnIjp7InF1YWxpdHkiOjkxfSwicmVzaXplIjp7IndpZHRoIjoxMTAwLCJoZWlnaHQiOjExMDAsImZpdCI6ImNvdmVyIn19LCJ2IjoiNmRmYTA4N2I0OTM5NTAwYzE3MTNkOTI4OThmOWM4NmQifQ=="
                                    onClick={() => selectImage("https://images.motocard.com/eyJidWNrZXQiOiJtb3RvY2FyZCIsImtleSI6InByb2R1Y3RzL2ltYWdlcy8wNzYyMi9hZ3YtcGlzdGFfZ3Bfcl9yb3NzaV93aW50ZXJfdGVzdF8yMDE5X2xpbWl0ZWRfZWRpdGlvbi0yLU0tMDc2MjI2MTM0LmpwZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODV9LCJqcGVnIjp7InF1YWxpdHkiOjkxfSwicmVzaXplIjp7IndpZHRoIjoxMTAwLCJoZWlnaHQiOjExMDAsImZpdCI6ImNvdmVyIn19LCJ2IjoiNmRmYTA4N2I0OTM5NTAwYzE3MTNkOTI4OThmOWM4NmQifQ==")}
                                    style={{width: "100%", cursor: "pointer"}}/>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-7">
                        <div className="row">
                            <h3>AGV Pista Soleluna 2022</h3>
                            <h5>Mã sản phẩm: FF0122</h5>
                            <h5>50.000.000đ</h5>
                            <p>- Vỏ mũ chất liệu Carbon cực kì nhẹ, 80% công đoạn ép vỏ mũ được làm thủ công. Người ta
                                phải xếp từng tấm carbon thật đều thành nhiều lớp, kết hợp với một số loại hạt nhựa,
                                than chì rồi phủ molded (dạng gel trong suốt) lên bề mặt rồi mới ép nhiệt.

                                - Mũ Bulldog Heli Carbon nhẹ hơn, đội thoải mái nên người dùng có thể tập trung lái xe
                                mà không phải lo cho các tác động khác như mũ nặng làm mỏi cổ, gây khó chịu...

                                - Dây viền dán bằng nhựa được dán thủ công rất tỉ mỉ, mang lại vẻ đẹp trau chuốt đến
                                từng chi tiết.

                                - Đuôi nón thiết kế tinh tế, sang trọng: thương hiệu Bulldog.
                            </p>
                        </div>
                        <div className="row d-flex mb-2 ">
                            <div className="col-md-3">
                                <div className="row">
                                    <div>
                                        <select className="form-control" name="" id="">
                                            <option value="">Chọn Size</option>
                                            <option value="">M</option>
                                            <option value="">L</option>
                                            <option value="">XL</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <button className="btn btn-dark btn-operator-plus"
                                        onClick={() => setQuantity(prevState => prevState - 1)}><span
                                    style={{fontWeight: "bold"}}>-</span></button>
                                <input id="input-quantity-product" className="form-control" type="number"
                                       value={quantity}/>
                                <button className="btn btn-dark btn-operator-subs"
                                        onClick={() => setQuantity(prevState => prevState + 1)}><span
                                    style={{fontWeight: "bold"}}>+</span></button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 justify-content-center d-flex">
                                <button className="btn btn-buy-product"><i className="bi bi-cart-plus"></i> THÊM VÀO GIỎ
                                    HÀNG
                                </button>
                            </div>
                            <div className="col-md-12 mt-2">
                                <img src="/anh/size-fullface.jpg" alt="" style={{width: "100%"}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-md-12 text-center d-flex">
                        <div className="col-md-4">
                            <hr/>
                        </div>
                        <h3 className=" col-md-4 sub-title-product">SẢN PHẨM LIÊN QUAN</h3>
                        <div className="col-md-4">
                            <hr/>
                        </div>
                    </div>
                    <FullFaceHot/>
                </div>

            </div>
        </>
    )
}