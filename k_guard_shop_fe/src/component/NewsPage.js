import React, {useEffect, useState} from "react";
import * as NewsService from "../service/NewsService"
import {Link, NavLink} from "react-router-dom";

export default function NewsPage() {
    const [news, setNews] = useState()
    const [newCurrent, setNewCurrent] = useState()
    const [descriptions, setDescription] = useState()
    const getAllNews = async () => {
        const res = await NewsService.getAllNews()
        setNews(res.data.content)
        setNewCurrent(res.data.content[0])
        setDescription(res.data.content[0].content.split("- "))
    }
    useEffect(() => {
        getAllNews()
    }, [])
    if (!news) {
        return null
    }
    return (
        <>
            <div className="px-5" style={{marginTop: "12vh"}}>
                <div className="row bg-dark text-light mb-2 align-items-center" style={{height: "3rem"}}>
                    <div className="col-md-4">
                        <Link to="/"><i className="bi bi-house-door" style={{color: "#fff"}}></i></Link> /<NavLink
                        to="/news-page" className="ms-2 text-light">Tin tức</NavLink>
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
                <div className="row">
                    <div className="col-md-9" >
                        <div align="center" style={{borderRight: "1px solid #a7a7a7db",paddingRight:"1rem"}}>
                            <h4>{newCurrent.title}</h4>
                            <hr style={{width: "5rem", border: "2px solid #a7a7a7db"}}/>
                            <p>Đăng ngày {newCurrent?.writeDate}</p>
                            <img src={newCurrent.image} alt="" style={{width: "80%"}}/>
                            {
                                descriptions.map((description) =>
                                    <p style={{textAlign: "justify"}}>{description}</p>
                                )
                            }
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div>
                            {
                                news && news.map((item, index) =>
                                    <Link key={index} to={`/news-page/detail/${item.id}`} className="col-md-12 product-link py-2">
                                        <div className="card-post-home">
                                            <span className="sale">HOT</span>
                                            <div className="image" style={{minHeight: "10rem"}}>
                                                <img style={{maxHeight: "10rem"}}
                                                     src={item.image}/>
                                            </div>
                                            <div className="details" style={{minHeight: "7rem"}}>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}