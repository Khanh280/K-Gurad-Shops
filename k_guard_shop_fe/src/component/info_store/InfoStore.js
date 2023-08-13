import {Link, NavLink} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import BackUp from "../BackUp";
import React, {useState} from "react";
import {Outlet} from "react-router";

export default function InfoStore() {
    const [chooseOption, setChooseOption] = useState()
    const dropDownOption = (option) => {
        let ulElement;
        let ulIcon;
        switch (option) {
            case "product-manager":
                ulElement = document.getElementById("product-manager");
                ulIcon = document.getElementById("product-icon");
                break;
            case "profit":
                ulElement = document.getElementById("profit-manager");
                ulIcon = document.getElementById("profit-icon");
                break;
            case "order":
                ulElement = document.getElementById("order-manager");
                ulIcon = document.getElementById("order-icon");
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
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2 align-items-center" style={{height: "3rem"}}>
                    <div className="col-md-4">
                        <Link to="/"><i className="bi bi-house-door" style={{color: "#fff"}}></i></Link> /<NavLink
                        to="/product" className="ms-2 text-light">Thông tin cửa hàng</NavLink>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                        {/*<select className="form-control w-25" name="" id=""*/}
                        {/*        // onChange={(event) => getAllProduct(types, event.target.value, brand.brand, nameSearch)}*/}
                        {/*>*/}
                        {/*    <option value="new">Sản phẩm mới nhất</option>*/}
                        {/*    <option value="a-z">Sắp xếp A-Z</option>*/}
                        {/*    <option value="priceAscending">Giá tăng dần</option>*/}
                        {/*    <option value="priceDescending">Giá giảm dần</option>*/}
                        {/*</select>*/}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div style={{position: "sticky", top: "12vh"}}>

                            <div className="mt-2">
                                <p id="click">Quản lý sản phẩm
                                    <i id="product-icon" className="bi bi-chevron-down"
                                       onClick={() => dropDownOption("product-manager")}
                                    ></i></p>
                                <ul id="product-manager" className="ms-2 dropdown-item-product-type"
                                    style={{borderLeft: "1px solid gray", display: 'none'}}>
                                   <NavLink to="/info-store/create-product">
                                       <li className="ms-1"
                                           style={{
                                               color: chooseOption === 1 ? "#F4882F" : ""
                                           }}
                                           onClick={() => {
                                               // getAllProduct("3/4", orderBy, brand.brand, nameSearch)
                                               setChooseOption(() => 1)
                                           }}>Thêm mới sản phẩm
                                       </li>
                                   </NavLink>
                                    <NavLink to="/info-store/product-list">
                                        <li className="ms-1"
                                            style={{
                                                color: chooseOption === 2 ? "#F4882F" : ""
                                            }}
                                            onClick={() => {
                                                // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                                setChooseOption(() => 2)
                                            }}>Danh sách sản phẩm
                                        </li>
                                    </NavLink>
                                </ul>
                                <p id="click"
                                   onClick={() => dropDownOption("order")}
                                >Quản lý hóa đơn
                                    <i id="order-icon" className="bi bi-chevron-down"></i></p>
                                <ul id="order-manager" className="ms-2 dropdown-item-product-type"
                                    style={{borderLeft: "1px solid gray", display: 'none'}}>
                                    <li className="ms-1" style={{
                                        color: chooseOption === 3 ? "#F4882F" : ""
                                    }}
                                        onClick={() => {
                                            // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 3)
                                        }}>Thêm mới đơn hàng
                                    </li>
                                    <li className="ms-1" style={{
                                        color: chooseOption === 4 ? "#F4882F" : ""
                                    }}
                                        onClick={() => {
                                            // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 4)
                                        }}
                                    >
                                    </li>
                                </ul>
                                <p id="click">Lợi nhuận
                                    <i id="profit-icon" className="bi bi-chevron-down"
                                       onClick={() => dropDownOption("profit")}
                                    ></i></p>
                                <ul id="profit-manager" className="ms-2 dropdown-item-product-type"
                                    style={{borderLeft: "1px solid gray", display: 'none'}}>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption === 5 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 5)
                                        }}>Giáp bảo hộ
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption === 6 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 6)
                                        }}>Găng tay
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption === 7 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 7)
                                        }}>Giày bảo hộ
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption === 8 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            // getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 8)
                                        }}>Thùng Givi
                                    </li>
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
                    </div>
                    <div className="col-md-9 pe-0">
                        <Outlet/>
                        {/*{*/}
                        {/*    page < totalPage - 1 ?*/}
                        {/*        <div className="col-md-12 d-flex justify-content-center mt-2">*/}
                        {/*            <button id="load-more-product"*/}
                        {/*                    className="btn btn-sm mt-2 justify-content-center load-more-btn"*/}
                        {/*                    onClick={() => loadMore(page, types, brand.brand, orderBy, nameSearch)}*/}
                        {/*                    style={{backgroundColor: "#fff", border: "1px solid #F4882F"}}>Xem thêm*/}
                        {/*                <i className="bi bi-chevron-down"></i></button>*/}
                        {/*        </div>*/}
                        {/*        :*/}
                        {/*        ""*/}
                        {/*}*/}

                    </div>
                </div>
            </div>
            <ToastContainer style={{top: "5.6rem"}}/>
            <BackUp/>
        </>
    )
}