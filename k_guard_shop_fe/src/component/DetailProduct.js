import React, {useEffect, useState} from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import FullFaceHot from "./FullFaceHot";
import "../css/product_detail.css"
import axios from "axios";
import "../css/home.css"
import {animateScroll as scroll} from "react-scroll";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useDispatch} from "react-redux";
import {updateCart} from "../redux/actions/cart";

export default function DetailProduct() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState();
    const [images, setImages] = useState();
    const [imageMain, setImageMain] = useState();
    const [des, setDes] = useState()
    const [sizes, setSize] = useState()
    const [isLogin, setIsLogin] = useState(false)
    const param = useParams();
    const token = localStorage.getItem("token")
    const selectImage = (url) => {
        setImageMain(() => url)
    }
    const dispatch = useDispatch()
    const getProductById = async () => {

        const res = await axios.post("http://localhost:8080/api/product/detail", param.id, {
            headers: {
                'Content-Type': 'text/plain', // Set the Content-Type header to indicate the raw data format
            }
        })
        setProduct(res.data[0].product)
        setImageMain(res.data[0].link)
        setImages(res.data)
        setDes(res.data[0].product.description.split("- " || "."))
    }
    const getSize = async () => {
        const res = await axios.get("http://localhost:8080/api/product/size")
        setSize(() => res.data)
    }
    useEffect(() => {
        scroll.scrollToTop();
        getProductById(param)
    }, [param])
    useEffect(() => {
        if (token) {
            setIsLogin(() => true)
        }
        getSize()
    }, [])
    if (!images || !imageMain || !product) {
        return null;
    }
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2 align-items-center" style={{height: "3rem"}}>
                    <div className="col-md-4">
                        <Link to="/"><i className="bi bi-house-door" style={{color: "#fff"}}></i></Link> /<NavLink
                        to="/product" className="ms-2 text-light">Sản phẩm </NavLink> / Chi tiết sản phẩm
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 p-0 ">
                        <div style={{border: "1px solid #b3b3b33b", borderRadius: "10px", overflow: "hidden"}}>
                            <div className="row">
                                <img
                                    src={imageMain}
                                    style={{width: "100%", objectFit: "cover"}}/>
                            </div>

                            <div className="row m-0 align-items-center" style={{borderTop: "1px solid #b3b3b33b"}}>
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

                    <div className="col-md-8">
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
                        <Formik
                            initialValues={{
                                product: "",
                                quantity: "",
                                size: "",
                                image: ""
                            }}
                            validationSchema={yup.object({
                                size: yup.number().required("Vui lòng chọn size").min(1, "Vui lòng chọn size")
                            })}
                            onSubmit={(value, {resetForm}) => {
                                const saveCart = async () => {
                                    if (quantity > 0 && quantity <= 10) {
                                        try {
                                            const newValue = {
                                                ...value,
                                                product: product,
                                                quantity: quantity,
                                                image: imageMain
                                            }
                                            if (isLogin) {
                                                const res = await axios.post("http://localhost:8080/api/shopping-cart/save-product", newValue,
                                                    {
                                                        withCredentials: true,
                                                        headers:{
                                                        "Authorization": "Bearer " + token
                                                        }
                                                    })
                                                await dispatch(updateCart(res.data.length))
                                            } else {
                                                const res = await axios.post("http://localhost:8080/api/shopping-cart", newValue,
                                                    {withCredentials: true})
                                                await dispatch(updateCart(res.data.length))
                                            }
                                            toast.success("Thêm vào giỏ hàng thành công.")
                                            resetForm(
                                                setQuantity(() => 1)
                                            )
                                        } catch (e) {
                                            toast.error("Thêm vào giỏ hàng thất bại.")
                                        }
                                    } else {
                                        toast.error("Số lượng sản phẩm quá lớn.")
                                    }
                                }
                                saveCart()
                            }}
                        >
                            <Form>
                                <div className="row d-flex mb-2 ">
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div>
                                                <Field as="select" className="form-control" name="size" id="">
                                                    <option value={0}>Chọn Size <sup>*</sup></option>
                                                    {
                                                        sizes.map((size, index) =>
                                                            <option value={size.id}>{size.name}</option>
                                                        )
                                                    }
                                                </Field>
                                                <ErrorMessage name="size" component="span" style={{color: "red"}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2 d-flex" style={{maxHeight: "2.4rem"}}>
                                        <button type="button" className="btn btn-dark btn-operator-plus"
                                                style={{
                                                    opacity: quantity <= 1 ? "20%" : "",
                                                    pointerEvents: quantity <= 1 ? "none" : ""
                                                }}
                                                onClick={() => setQuantity(prevState => prevState - 1)}>
                                            <span style={{fontWeight: "bold",}}>-</span></button>
                                        <Field name="quantity" id="input-quantity-product" className="form-control"
                                               type="number"
                                               value={quantity} style={{width: "4rem"}}/>
                                        <button type="button" className="btn btn-dark btn-operator-subs"
                                                style={{
                                                    opacity: quantity >= 10 ? "20%" : "",
                                                    pointerEvents: quantity >= 10 ? "none" : ""
                                                }}
                                                onClick={() => setQuantity(prevState => prevState + 1)}><span
                                            style={{fontWeight: "bold"}}>+</span></button>
                                    </div>
                                    <div className="col-md-7 input-group flex-nowrap" style={{maxHeight: "2.4rem"}}>
                                          <span className="input-group-text" id="addon-wrapping"
                                                style={{borderRadius: ".25rem 0 0 .25rem", borderRight: "none"}}>
                                            Tổng tiền
                                          </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            readOnly
                                            aria-label="Username"
                                            aria-describedby="addon-wrapping"
                                            value={(quantity * product?.price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "đ"}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-12 justify-content-center d-flex">
                                        <button type="submit" className="btn btn-buy-product"><i
                                            className="bi bi-cart-plus"></i> THÊM VÀO GIỎ
                                            HÀNG
                                        </button>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <img src="/anh/size-fullface.jpg" alt="" style={{width: "100%"}}/>
                                    </div>
                                </div>
                            </Form>
                        </Formik>

                    </div>
                </div>
                <div className=" row mt-5 mb-5">
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
            <ToastContainer style={{top: "5.6rem"}}/>
        </>
    )
}