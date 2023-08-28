import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as ProductService from "../service/ProductService"

export default function FullFaceHot() {
    const [products, setProducts] = useState();
    const getTop4Product = async () => {
        try {
            const res = await ProductService.getTop4Product()
            setProducts(() => res.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getTop4Product()
    }, [])
    return (
        <>
            {
                products ?
                    <>
                        {
                            products.map((product) =>
                                <Link to={`/product/detail/${product.id}`} className="col-md-3 product-link">
                                    <div className="card">
                                        <span className="sale">Mới</span>
                                        <div className="image">
                                            <img
                                                src={product?.linkImage}/>
                                        </div>
                                        <div className="details align-items-center d-grid">
                                            <h6>{product?.name}</h6>
                                            <div className="price-ratings">
                                                <div className="price">
                                                    <span>{product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
                                                </div>
                                                <div className="ratings">
                                                    <button className="btn btn-sm" style={{
                                                        border: "1px solid orange",
                                                        backgroundColor: "white"
                                                    }}>Xem
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        <div className="col-md-12 d-flex justify-content-center mt-2">
                            <Link to="/product" id="load-more-product"
                                  className="btn btn-sm mt-2 justify-content-center load-more-btn"
                                  style={{backgroundColor: "#fff", border: "1px solid #F4882F"}}>Xem tất cả sản phẩm
                                {/*<i className="bi bi-chevron-down"></i>*/}
                            </Link>
                        </div>
                    </>
                    :
                    <div align="center">
                        <h5>Hiện tại không có sản phẩm</h5>
                    </div>
            }

        </>
    )
}