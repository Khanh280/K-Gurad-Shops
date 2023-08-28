import React, {useEffect, useState} from "react";
import * as NewsService from "../service/NewsService"
export default function NewsPage() {
    const [news, setNews] = useState()
    const getAllNews = async ()=>{
        const res = await NewsService.getAllNews()
        setNews(res.data.content)
    }
    useEffect(()=>{
        getAllNews()
    },[])
    if(!news){
        return null
    }
    return (
        <>
            {
                news.map((item)=>
                    <img src={item.image} alt=""/>
                )
            }
        </>
    )
}