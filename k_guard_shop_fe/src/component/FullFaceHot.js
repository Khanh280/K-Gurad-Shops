import {Link} from "react-router-dom";
import React from "react";

export default function FullFaceHot() {
    return (
        <>
            <Link to={`/product/detail/${1}`} className="col-md-3 product-link">
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

            <Link to={`/product/detail/${1}`} className="col-md-3 product-link">
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
            <Link to={`/product/detail/${1}`} className="col-md-3 product-link">
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
            <Link to={`/product/detail/${1}`} className="col-md-3 product-link">
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
                <Link to="/product" id="load-more-product" className="btn btn-sm mt-2 justify-content-center"
                        style={{backgroundColor: "#fff", border: "1px solid #F4882F"}}>Xem thêm<i
                    className="bi bi-chevron-down"></i></Link>
            </div>
        </>
    )
}