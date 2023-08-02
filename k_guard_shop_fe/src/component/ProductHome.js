import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import FullFaceHot from "./FullFaceHot";

export default function ProductHome() {
    const [products, setProducts] = useState(12)
    const fora = () => {
        const cart = [];
        for (let i = 0; i < products; i++) {
            cart.push(
                <Link to={`/product/detail/${1}`} className="col-md-3 product-link">
                    <div className="card mt-2" style={{height:"15rem"}}>
                        <span className="sale">Mới</span>
                        <div className="image" style={{height: "15rem"}}>
                            <img
                                src="https://th.bing.com/th/id/R.93487ab8c22e6267c2fad82769142ea1?rik=Vi0QqXJVEpKjGw&riu=http%3a%2f%2fscoyco.com.vn%2fuploads%2fkinh+kyt+tt+course1_1.jpg&ehk=YyZ%2bnGgrBlJ8egVFcsJV%2bdbvi9IWrbjDc3kmXfRMzcU%3d&risl=&pid=ImgRaw&r=0"
                            style={{width:"100%",height:"90%"}}/>
                        </div>
                        <div className="details" style={{padding:"0 10px"}}>
                            <h3 style={{fontSize:"1rem"}}>Black Forest cake</h3>
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
                </Link>)
        }
        return cart;
    }

    return (
        <>
            <div className="container" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2">
                    <i className="bi bi-house-door"> /<NavLink to="/product" className="ms-2 text-light">Sản
                        phẩm</NavLink> / Chi tiết
                        sản phẩm</i>
                </div>
                <div className="row mb-3">
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                        {
                            fora()
                        }
                    </div>
                </div>
            </div>
        </>
    )
}