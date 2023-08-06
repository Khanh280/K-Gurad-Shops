import React, {useEffect, useState} from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import FullFaceHot from "./FullFaceHot";
import "../css/product_detail.css"
import axios from "axios";
import "../css/home.css"

export default function DetailProduct() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState();
    const [images, setImages] = useState();
    const [imageMain, setImageMain] = useState();
    const [des, setDes] = useState()
    const param = useParams();
    const selectImage = (url) => {
        setImageMain(() => url)
    }
    const getProductById = async () => {
        const res = await axios.post("http://localhost:8080/api/product/detail", param.id, {
            headers: {
                'Content-Type': 'text/plain', // Set the Content-Type header to indicate the raw data format
            }
        })
        setProduct(res.data[0].product)
        setImageMain(res.data[0].link)
        setImages(res.data)
        setDes(res.data[0].product.description.split("-" || "."))
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        getProductById(param)
    }, [param])
    useEffect(() => {
    }, [imageMain])
    if (!images || !imageMain || !product) {
        return null;
    }
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
                    <div className="col-md-5 p-0 ">
                        <div style={{border: "1px solid #b3b3b33b", borderRadius: "10px"}}>
                            <div className="row">
                                <img
                                    src={imageMain}
                                    style={{width: "100%", borderRadius: "20px"}}/>
                            </div>

                            <div className="row m-0" style={{borderTop: "1px solid #b3b3b33b"}}>
                                {
                                    images.map((image, index) =>
                                        <div key={index} className="col-md-3 image-detail">
                                            <img
                                                src={image.link}
                                                onClick={() => selectImage(image.link)}
                                                style={{width: "100%", cursor: "pointer"}}/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </div>

                    <div className="col-md-7">
                        <div className="row">
                            <h3>{product?.name}</h3>
                            <h5>Mã sản phẩm: SP-{product?.id}</h5>
                            <h5>Giá: {product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</h5>
                            <p>
                                {
                                    des.map((item) =>
                                        item !== "" ?
                                            <p><i className="bi bi-dot"></i>{item}</p>
                                            :
                                            ""
                                    )
                                }
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