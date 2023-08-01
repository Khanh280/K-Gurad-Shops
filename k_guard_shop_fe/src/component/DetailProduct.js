import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function DetailProduct() {
    const [quantity, setQuantity] = useState(1);
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <div className="container" style={{marginTop: "11vh"}}>
                <i className="bi bi-house-door"><Link to="" className="ms-2">Trang chủ</Link> > Chi tiết sản phẩm</i>
                <hr style={{marginTop: "0"}}/>
                <div className="row">
                    <div className="col-md-5 p-0 "
                         style={{border: "1px solid #b3b3b33b", borderRadius: "10px", height: "36rem"}}>
                        <div className="row">
                            <img
                                src="https://th.bing.com/th/id/OIP.ycxdk81Hf058msVUOTE4YwHaHa?pid=ImgDet&w=900&h=900&rs=1"
                                style={{width: "100%", borderRadius: "20px"}}/>
                        </div>

                        <div className="row m-0" style={{borderTop: "1px solid #b3b3b33b"}}>
                            <div className="col-md-3">
                                <img
                                    src="https://th.bing.com/th/id/OIP.ycxdk81Hf058msVUOTE4YwHaHa?pid=ImgDet&w=900&h=900&rs=1"
                                    style={{width: "100%"}}/>
                            </div>
                            <div className="col-md-3">
                                <img
                                    src="https://th.bing.com/th/id/R.10b758fe9dd43ffdceeadec4266be587?rik=PZfQKsdIRwfGsw&pid=ImgRaw&r=0"
                                    style={{width: "100%"}}/>
                            </div>
                            <div className="col-md-3">
                                <img
                                    src="https://twomotion.net/wp-content/uploads/2020/06/AGV-Pista-GP-R-Limited.png"
                                    style={{width: "100%"}}/>
                            </div>
                            <div className="col-md-3">
                                <img
                                    src="https://images.motocard.com/eyJidWNrZXQiOiJtb3RvY2FyZCIsImtleSI6InByb2R1Y3RzL2ltYWdlcy8wNzYyMi9hZ3YtcGlzdGFfZ3Bfcl9yb3NzaV93aW50ZXJfdGVzdF8yMDE5X2xpbWl0ZWRfZWRpdGlvbi0yLU0tMDc2MjI2MTM0LmpwZyIsImVkaXRzIjp7IndlYnAiOnsicXVhbGl0eSI6ODV9LCJqcGVnIjp7InF1YWxpdHkiOjkxfSwicmVzaXplIjp7IndpZHRoIjoxMTAwLCJoZWlnaHQiOjExMDAsImZpdCI6ImNvdmVyIn19LCJ2IjoiNmRmYTA4N2I0OTM5NTAwYzE3MTNkOTI4OThmOWM4NmQifQ=="
                                    style={{width: "100%"}}/>
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
                    <div className="col-md-12 text-center">
                        <h3 className="sub-title-product">SẢN PHẨM LIÊN QUAN</h3>
                        {/*<hr style={{*/}
                        {/*    boxShadow: "0px 3px 10px #ff9300",*/}
                        {/*    borderBottom: "1px solid #ff8c00d9",*/}
                        {/*    width: "100%",*/}
                        {/*}}/>*/}
                    </div>
                    <Link to="/detail" className="col-3 product-link">
                        <div className="card">
                            <span className="sale">Mới</span>
                            <div className="image" style={{height: "32vh"}}>
                                <img
                                    src="https://th.bing.com/th/id/R.478e5e20fc205672a24673778a6cd38f?rik=qHdW6vedazBF7g&pid=ImgRaw&r=0"/>
                            </div>
                            <div className="details">
                                <h3>Black Forest cake</h3>
                                <div className="price-ratings">
                                    <div className="price">
                                        <span>$7.99 </span>
                                    </div>
                                    <div className="ratings">
                                        Mua
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/detail" className="col-3 product-link">
                        <div className="card">
                            <span className="sale">Mới</span>
                            <div className="image" style={{height: "32vh"}}>
                                <img
                                    src="https://th.bing.com/th/id/R.93487ab8c22e6267c2fad82769142ea1?rik=Vi0QqXJVEpKjGw&riu=http%3a%2f%2fscoyco.com.vn%2fuploads%2fkinh+kyt+tt+course1_1.jpg&ehk=YyZ%2bnGgrBlJ8egVFcsJV%2bdbvi9IWrbjDc3kmXfRMzcU%3d&risl=&pid=ImgRaw&r=0"/>
                            </div>
                            <div className="details">
                                <h3>Black Forest cake</h3>
                                <div className="price-ratings">
                                    <div className="price">
                                        <span>$7.99 </span>
                                    </div>
                                    <div className="ratings">
                                        Mua
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/detail" className="col-3 product-link">
                        <div className="card">
                            <span className="sale">Mới</span>
                            <div className="image" style={{height: "32vh"}}>
                                <img
                                    src="https://th.bing.com/th/id/OIP.ycxdk81Hf058msVUOTE4YwHaHa?pid=ImgDet&w=900&h=900&rs=1"/>
                            </div>
                            <div className="details">
                                <h3>Black Forest cake</h3>
                                <div className="price-ratings">
                                    <div className="price">
                                        <span>$7.99 </span>
                                    </div>
                                    <div className="ratings">
                                        Mua
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/detail" className="col-3 product-link">
                        <div className="card">
                            <span className="sale">Mới</span>
                            <div className="image" style={{height: "32vh"}}>
                                <img
                                    src="https://th.bing.com/th/id/R.6061e441f5a6effc278cde3f862949fb?rik=IxLUDAMB8ro8Dw&pid=ImgRaw&r=0"/>
                            </div>
                            <div className="details">
                                <h3>Black Forest cake</h3>
                                <div className="price-ratings">
                                    <div className="price">
                                        <span>$7.99 </span>
                                    </div>
                                    <div className="ratings">
                                        Mua
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="col-md-12 d-flex justify-content-center mt-2">
                        <button id="load-more-product" className="btn btn-sm mt-2 justify-content-center"
                                style={{backgroundColor: "#fff", border: "1px solid #F4882F"}}>Xem thêm<i
                            className="bi bi-chevron-down"></i></button>
                    </div>
                </div>

            </div>
        </>
    )
}