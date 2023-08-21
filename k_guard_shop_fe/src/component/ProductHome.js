import React, {useEffect, useState} from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import "../css/product_home.css"
import BackUp from "./BackUp";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import {updateCart} from "../redux/actions/cart";
import {toast, ToastContainer} from "react-toastify";
import * as ProductService from "../service/ProductService"
import * as ShoppingCartService from "../service/ShoppingCartService"

export default function ProductHome() {
    const [products, setProducts] = useState()
    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState()
    const brand = useParams();
    const type = useParams();
    const [types, setType] = useState();
    const [nameSearch, setNameSearch] = useState("");
    const [chooseOption, setChooseOption] = useState(0)
    // const [sizes, setSize] = useState()
    const [isLogin, setIsLogin] = useState(false)
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
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
    const getAllProduct = async (nameType, orderBy, brand, nameSearch) => {
        try {
            const res = await ProductService.getAllProduct(nameType, orderBy, brand, nameSearch)
            await setProducts(() => res.data.content)
            await setTotalPage(() => res.data.totalPages)
            await setType(() => nameType)
            await setPage(() => 0)
            await setOrderBy(() => orderBy)
            await setNameSearch(() => nameSearch)
        } catch (e) {
            setProducts(() => [])
        }
    }
    const getAllProductByType = async (type) => {
       try{
           const res = await ProductService.getAllProductByType(type)
           await setProducts(() => res.data.content)
           await setTotalPage(() => res.data.totalPages)
           await setType(() => type)
           setPage(() => 0)
       }catch (e) {
           setProducts(()=>[])
       }
    }
    const getAllProductByBrand = async (brand) => {
        const res = await ProductService.getAllProductByBrand(brand)
        await setProducts(() => res.data.content)
        await setTotalPage(() => res.data.totalPages)
        setPage(() => 0)
    }


    const loadMore = async (page, type, brand, orderBy, nameSearch) => {
        if (page + 1 < totalPage) {
            console.log(page)
            const res = await ProductService.loadMore(page, type, brand, orderBy, nameSearch, totalPage)
            await setProducts(prevState => [...prevState, ...res.data.content])
            await setPage(prevState => prevState + 1)
        }
    }
    const modals = async (product) => {
        const res = await ProductService.getSize(product.id)
        const productSizes = res.data;
        // setSize(() => res.data)
        const {value: formValues} = await Swal.fire({
            // icon: "success",
            title: "Thêm vào giỏ hàng",
            html: `
                <form id="swal-form" style="justify-content: center;display: flex;min-height: 6rem">
                <table>
                <tr>
                <td>Sản phẩm: </td>
                <td><p id="name" style="margin: 0">
                </td>
                </tr>
                <tr>
                <td style="justify-content: start;align-items: center;display: flex">Số lượng</td>
                <td>
                <input type="text"  id="quantity" style="width: 100%;">
                <p style="color:red;" id="error"></p>
                </td>
                </tr>
                <br>
                <tr>
                <td style="justify-content: start;align-items: center;display: flex">Size</td>
                <td>
                <select name="size" id="sizeSelect" style="width: 100%"></select>
                </td>
                </tr>
<!--                <tr>-->
<!--                <td>Số sản phẩm hiện tại:</td>-->
<!--                <td id="quantity-store">Số sản phẩm hiện tại:</td>-->
<!--                </tr>-->
                </table>
            `,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true,
            width: "50%",
            didOpen: () => {
                // Focus on the first input when the modal is opened
                document.getElementById('quantity').focus();
                document.getElementById('name').innerHTML = product.name;
                // document.getElementById('quantity-store').innerHTML = product.quantity;
                const selectElement = document.getElementById("sizeSelect");
                const quantityInput = document.getElementById("quantity")
                const confirm = Swal.getConfirmButton()
                confirm.disabled = true;
                quantityInput.oninput = function () {
                    const quantity = quantityInput.value

                    if (quantity <= 0 || quantity > 10 || isNaN(quantity)) {
                        confirm.disabled = true;
                        document.getElementById('error').innerText = "Số lượng sản phẩm > 0 và <= 10"
                    } else {
                        confirm.disabled = false;
                        document.getElementById('error').innerText = ""


                    }
                }

                productSizes.forEach(productSize => {
                    const option = document.createElement("option");
                    option.value = productSize.id;
                    option.textContent = productSize.sizeName;
                    selectElement.appendChild(option);
                })
            }
        })
        if (formValues) {
            const quantity = document.getElementById('quantity').value;
            const productSizeId = document.getElementById('sizeSelect').value;
            product = {
                ...product,
                productType: {
                    id: ""
                }
            }
            const shoppingCart = {
                id: "",
                productSize: {
                    id: productSizeId,
                    product: product,
                    sizes: {
                        id: ""
                    }
                }, quantity: quantity, image: product.linkImage
            }
            const shoppingDTO = {shoppingCart}
            let res;
            try {
                if (isLogin) {
                    res = await ShoppingCartService.saveShoppingCartCustomer(shoppingCart)
                    await dispatch(updateCart(res.data.length))
                } else {
                    res = await ShoppingCartService.saveShoppingCartSession(shoppingCart)
                    dispatch(updateCart(res.data.length))
                }
                toast.success("Thêm vào giỏ hàng thành công.")
            } catch (e) {
                dispatch(updateCart(e.response.data.length))
                toast.warning("Số lượng lớn hơn số lượng trong kho.")
            }
        }
    }
    const resetFieldName = (resetForm) => {
        resetForm(); // Reset the form
        setNameSearch(() => "")
    };
    useEffect(() => {
        if (token) {
            setIsLogin(() => true)
        }
        if (type.type !== undefined) {
            getAllProductByType(type.type);
        } else if (brand.brand) {
            getAllProductByBrand(brand.brand)
        } else {
            getAllProduct()
        }
        window.scrollTo(0, 0)
    }, [brand.brand, type.type])
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
                        <select className="form-control w-25" name="" id=""
                                onChange={(event) => getAllProduct(types, event.target.value, brand.brand, nameSearch)}>
                            <option value="new">Sản phẩm mới nhất</option>
                            <option value="a-z">Sắp xếp A-Z</option>
                            <option value="priceAscending">Giá tăng dần</option>
                            <option value="priceDescending">Giá giảm dần</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3">
                        <div style={{position: "sticky", top: "12vh"}}>

                            <div className="mt-2">
                                <Formik
                                    initialValues={{
                                        name: ""
                                    }}
                                    onSubmit={(values) => {
                                        const search = async () => {
                                            await getAllProduct(types, orderBy, brand.brand, values.name.trim())
                                            await setPage(() => 0)
                                            await setType("")
                                            await setNameSearch(values.name.trim())
                                        }
                                        search()

                                    }}>
                                    {({resetForm}) => (
                                        <Form>
                                            <div className="mb-2 d-flex " style={{position: "relative"}}>
                                                <Field name="name" className="form-control" type="text"
                                                       style={{width: "100%", borderRadius: "5px"}}
                                                       placeholder="Tên sản phẩm"/><span className="cancel-search"
                                                                                         onClick={() => resetFieldName(resetForm)}><i
                                                className="bi bi-x-circle-fill"></i></span>
                                                <button type="submit"
                                                        className="btn bg-dark text-light align-items-center d-flex ms-2">
                                                    <i className="bi bi-search"></i>
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                {/*can fix lai cach active*/}
                                <p id="click"
                                   style={{
                                       color: chooseOption == 0 ? "#F4882F" : ""
                                   }}
                                   onClick={() => {
                                       getAllProduct("", orderBy, "", nameSearch)
                                       setChooseOption(() => 0)
                                       brand.brand = ""
                                   }}>Tất cả</p>
                                <p id="click">Mũ bảo hiểm
                                    <i id="fullface-icon" className="bi bi-chevron-down"
                                       onClick={() => dropDownOption("fullface")}></i></p>
                                <ul id="fullface" className="ms-2 dropdown-item-product-type"
                                    style={{borderLeft: "1px solid gray", display: 'none'}}>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption == 1 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            getAllProduct("3/4", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 1)
                                        }}>Mũ
                                        3/4
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption == 2 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            getAllProduct("fullface", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 2)
                                        }}>Mũ Fullface
                                    </li>
                                </ul>
                                {/*<p id="click" onClick={() => dropDownOption("armor")}>Giáp bảo hộ*/}
                                {/*    <i id="armor-icon" className="bi bi-chevron-down"></i></p>*/}
                                {/*<ul id="armor" className="ms-2 dropdown-item-product-type" style={{borderLeft: "1px solid gray", display: 'none'}}>*/}
                                {/*    <li className="ms-1">ALPINESTARS</li>*/}
                                {/*    <li className="ms-1">FOX RACING</li>*/}
                                {/*    <li className="ms-1">JOE ROCKET</li>*/}
                                {/*</ul>*/}
                                <p id="click">Đồ bảo hộ khác
                                    <i id="different-icon" className="bi bi-chevron-down"
                                       onClick={() => dropDownOption("different")}></i></p>
                                <ul id="different" className="ms-2 dropdown-item-product-type"
                                    style={{borderLeft: "1px solid gray", display: 'none'}}>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption == 3 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            getAllProduct("armor", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 3)
                                        }}>Giáp bảo hộ
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption == 4 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            getAllProduct("glove", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 4)
                                        }}>Găng tay
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption == 5 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            getAllProduct("shoe", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 5)
                                        }}>Giày bảo hộ
                                    </li>
                                    <li className="ms-1"
                                        style={{
                                            color: chooseOption == 6 ? "#F4882F" : ""
                                        }}
                                        onClick={() => {
                                            getAllProduct("barrel", orderBy, brand.brand, nameSearch)
                                            setChooseOption(() => 6)
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
                        <>
                            <div className="row">
                                {
                                    products.map((product, index) =>
                                            // <Link key={index} to={`/product/detail/${product.id}`}
                                            //       className="col-md-3 product-link">
                                            <div className="col-md-3">
                                                <div className=" card-product-home mt-2" style={{maxHeight: "20rem"}}>
                                                    {/*<span className="sale">Mới</span>*/}
                                                    <Link key={index} to={`/product/detail/${product.id}`}
                                                          className="product-link detail-link">
                                                        <div className="image">
                                                            <img
                                                                src={product?.linkImage}
                                                                style={{width: "100%", height: "100%"}}/>
                                                            <p style={{width: "100%", textAlign: "center"}}>Xem sản phẩm</p>
                                                        </div>
                                                    </Link>
                                                    <div className="details align-items-center d-grid"
                                                         style={{padding: "0 10px", minHeight: "5rem"}}>
                                                        <h6 style={{fontSize: "1rem"}}>{product.name}</h6>
                                                        <div className="price-ratings">
                                                            <div className="price">
                                                                <span>{product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                                            </div>
                                                            <div className="ratings">
                                                                <i className="bi bi-cart-plus" onClick={() => {

                                                                    modals(product)
                                                                }}
                                                                   style={{fontSize: "1.5rem"}}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        // </Link>
                                    )
                                }
                            </div>
                            {
                                page < totalPage - 1 ?
                                    <div className="col-md-12 d-flex justify-content-center mt-2">
                                        <button id="load-more-product"
                                                className="btn btn-sm mt-2 justify-content-center load-more-btn"
                                                onClick={() => loadMore(page, types, brand.brand, orderBy, nameSearch)}
                                                style={{backgroundColor: "#fff", border: "1px solid #F4882F"}}>Xem thêm
                                            <i className="bi bi-chevron-down"></i></button>
                                    </div>
                                    :
                                    ""
                            }
                        </>

                    </div>
                </div>
            </div>
            <ToastContainer style={{top: "5.6rem"}}/>
            <BackUp/>
        </>
    )
}