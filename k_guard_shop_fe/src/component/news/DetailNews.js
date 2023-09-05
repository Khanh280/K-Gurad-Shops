import React, {useEffect, useState} from "react";
import * as NewsService from "../../service/NewsService"
import {useParams} from "react-router";
import {Link, NavLink} from "react-router-dom";

export default function DetailNews() {
    const [newsDetail, setNewsDetail] = useState()
    const [news, setNews] = useState()
    const [descriptions, setDescription] = useState()
    const param = useParams()
    const getNewsById = async (id) => {
        try {
            const res = await NewsService.getNewsById(id)
            setNewsDetail(() => res.data)
            setDescription(res.data.content.split("- "))
        } catch (e) {
            setNewsDetail(() => null)
            setDescription(() => [])
        }
    }
    const getAllNews = async () => {
        const res = await NewsService.getAllNews()
        setNews(res.data.content)
    }
    useEffect(() => {
        window.scrollTo(0,0)
        getNewsById(param.id)
    }, [param.id])
    useEffect(() => {
        window.scrollTo(0,0)
        getAllNews()
    }, [])
    if (newsDetail === undefined) {
        return null
    }
    return (
        <>
            {
                newsDetail ?
                    <div className="row">
                        <div className="col-md-9">
                            <div align="center" style={{borderRight: "1px solid #a7a7a7db", paddingRight: "1rem"}}>
                                <h4>{newsDetail.title}</h4>
                                <hr style={{width: "5rem", border: "2px solid #a7a7a7db"}}/>
                                <p>Đăng ngày {newsDetail?.writeDate}</p>
                                <img src={newsDetail.image} alt="" style={{width: "80%"}}/>
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
                                        <Link key={index} to={`/news-page/detail/${item.id}`}
                                              className="col-md-12 product-link py-2">
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
                    :
                    <div align="center">
                        <h4 className="text-danger">Không có bài viết nào</h4>
                    </div>
            }
        </>
    )
}