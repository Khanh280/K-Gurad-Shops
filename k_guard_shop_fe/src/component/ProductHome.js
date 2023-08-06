import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import "../css/product_home.css"
import BackUp from "./BackUp";
import axios from "axios";

export default function ProductHome() {
    const [products, setProducts] = useState()
    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(0)

    const dropDownOption = (options) => {
        let ulElement;
        let ulIcon;
        switch (options) {
            case "fullface":
                ulElement = document.getElementById('fullface')
                ulIcon = document.getElementById('fullface-icon')
                break;
            case "armor":
                ulElement = document.getElementById('armor')
                ulIcon = document.getElementById('armor-icon')
                break;
            case "different":
                ulElement = document.getElementById('different')
                ulIcon = document.getElementById('different-icon')
                break;
        }
        ulIcon.style.transition = "transform 0.5s";
        if (ulElement.style.display === 'none') {
            ulElement.style.display = 'block';
            ulIcon.style.transform = 'rotate(180deg)';
        } else {
            ulElement.style.display = 'none';
            ulIcon.style.transform = 'rotate(0deg)';
        }
    }
    const getAllProduct = async () => {
        const res = await axios.get("http://localhost:8080/api/product")
        await setProducts(() => res.data.content)
        await setTotalPage(() => res.data.totalPages)
        await setPage(prevState => prevState+1)
        console.log(res.data.content)
    }

    const loadMore = async () => {
        // if (page <= totalPage + 1) {
        //     console.log(page)
        //     const res = await axios.get("http://localhost:8080/api/product?page=" + page)
        //     await setProducts(prevState => [...prevState, ...res.data.content])
        //     await setPage(prevState => prevState+1)
        // }
    }

    useEffect(() => {
        getAllProduct()
        window.scrollTo(0, 0)
    }, [])
    if (!products) {
        return null;
    }
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2 align-items-center" style={{height: "3rem"}}>
                    <div className="col-md-4">
                        <Link to="/"><i className="bi bi-house-door" style={{color: "#fff"}}></i></Link> /<NavLink
                        to="/product" className="ms-2 text-light">Sản
                        phẩm</NavLink>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                        <select className="form-control w-25" name="" id="">
                            <option value="">Sản phẩm mới nhất</option>
                            <option value="">Sắp xếp A-Z</option>
                            <option value="">Giá tăng dần</option>
                            <option value="">Giá giảm dần</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div className="mt-2">
                            <div className="mb-2 d-flex">
                                <input className="form-control" type="text"
                                       style={{width: "100%", borderRadius: "5px"}}
                                       placeholder="Tên sản phẩm"/>
                                <button className="btn bg-dark text-light align-items-center d-flex ms-2">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                            <p id="click" onClick={() => dropDownOption("fullface")}>Mũ bảo hiểm
                                <i id="fullface-icon" className="bi bi-chevron-down"></i></p>
                            <ul id="fullface" className="ms-2" style={{borderLeft: "1px solid gray", display: 'none'}}>
                                <li className="ms-1">Mũ 3/4</li>
                                <li className="ms-1">Mũ Fullface</li>
                            </ul>
                            <p id="click" onClick={() => dropDownOption("armor")}>Giáp bảo hộ
                                <i id="armor-icon" className="bi bi-chevron-down"></i></p>
                            <ul id="armor" className="ms-2" style={{borderLeft: "1px solid gray", display: 'none'}}>
                                <li className="ms-1">ALPINESTARS</li>
                                <li className="ms-1">FOX RACING</li>
                                <li className="ms-1">JOE ROCKET</li>
                            </ul>
                            <p id="click" onClick={() => dropDownOption("different")}>Đồ bảo hộ khác
                                <i id="different-icon" className="bi bi-chevron-down"></i></p>
                            <ul id="different" className="ms-2" style={{borderLeft: "1px solid gray", display: 'none'}}>
                                <li className="ms-1">Găng tay</li>
                                <li className="ms-1">Giày bảo hộ</li>
                                <li className="ms-1">JOE ROCKET</li>
                            </ul>

                        </div>
                        <div>
                            <Link to={`/product/detail/${1}`} className="col-md-12 product-link p-0">
                                <div className="card mt-2" style={{height: "15rem"}}>
                                    {/*<span className="sale">Mới</span>*/}
                                    <div className="image" style={{height: "15rem"}}>
                                        <img
                                            src="https://th.bing.com/th/id/R.93487ab8c22e6267c2fad82769142ea1?rik=Vi0QqXJVEpKjGw&riu=http%3a%2f%2fscoyco.com.vn%2fuploads%2fkinh+kyt+tt+course1_1.jpg&ehk=YyZ%2bnGgrBlJ8egVFcsJV%2bdbvi9IWrbjDc3kmXfRMzcU%3d&risl=&pid=ImgRaw&r=0"
                                            style={{width: "100%", height: "90%"}}/>
                                    </div>
                                    <div className="details" style={{padding: "0 10px"}}>
                                        <h3 style={{fontSize: "1rem"}}>Black Forest cake</h3>
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
                        </div>
                    </div>
                    <div className="col-md-9 pe-0">
                        {
                            products.map((product, index) =>
                                <Link key={index} to={`/product/detail/${product.id}`} className="col-md-3 product-link">
                                    <div className="card-product-home mt-2" style={{minHeight: "13rem"}}>
                                        {/*<span className="sale">Mới</span>*/}
                                        <div className="image" style={{minHeight: "6rem"}}>
                                            <img
                                                src={product.linkImage}
                                                style={{width: "100%", height: "100%"}}/>
                                        </div>
                                        <div className="details" style={{padding: "0 10px"}}>
                                            <h3 style={{fontSize: "1rem"}}>{product.name}</h3>
                                            <div className="price-ratings">
                                                <div className="price">
                                                    <span>{product.price}</span>
                                                </div>
                                                <div className="ratings">
                                                    Mua
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        <div className="col-md-12 d-flex justify-content-center mt-2">
                            <button id="load-more-product" className="btn btn-sm mt-2 justify-content-center"
                                    onClick={() => loadMore()}
                                    style={{backgroundColor: "#fff", border: "1px solid #F4882F"}}>Xem thêm<i
                                className="bi bi-chevron-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <BackUp/>
        </>
    )
}