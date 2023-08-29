import React, {useEffect, useState} from "react";
import * as NewsService from "../../service/NewsService"
import {Link, NavLink} from "react-router-dom";
import {Outlet} from "react-router";

export default function NewsPage() {
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2 align-items-center" style={{height: "3rem"}}>
                    <div className="col-md-4">
                        <Link to="/"><i className="bi bi-house-door" style={{color: "#fff"}}></i></Link> /<NavLink
                        to="/news-page/list" className="ms-2 text-light">Tin tức</NavLink>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                        <select className="form-control w-25" name="" id=""
                        >
                            <option value="new">Sản phẩm mới nhất</option>
                            <option value="a-z">Sắp xếp A-Z</option>
                            <option value="priceAscending">Giá tăng dần</option>
                            <option value="priceDescending">Giá giảm dần</option>
                        </select>
                    </div>
                </div>
                <Outlet/>
            </div>
        </>
    )
}