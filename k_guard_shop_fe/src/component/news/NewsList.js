import React, {useEffect, useState} from "react";
import * as NewsService from "../../service/NewsService";
import {Link} from "react-router-dom";

export default function NewsList() {
    const [news, setNews] = useState()
    const getAllNews = async () => {
        const res = await NewsService.getAllNews()
        setNews(res.data.content)
    }
    useEffect(() => {
        getAllNews()
    }, [])
    if (!news) {
        return null
    }
    return (
        <>
            <div className="row">
                <div className="col-md-9">
                    {
                        news && news.map((item, index) =>
                            <Link key={index} to={`/news-page/detail/${item.id}`} className="col-md-4 product-link py-2">
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
        </>
    )

}