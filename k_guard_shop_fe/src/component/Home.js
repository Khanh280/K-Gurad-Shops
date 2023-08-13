import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap-grid.css"
import "bootstrap/dist/js/bootstrap"
import "../css/home.css"
import {Link} from "react-router-dom";
import FullFaceHot from "./FullFaceHot";
import {animateScroll as scroll} from 'react-scroll';
import BackUp from "./BackUp";
import {Carousel} from "react-bootstrap"
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useDispatch} from "react-redux";
import {getAllCart} from "../redux/actions/cart";
import axios from "axios";

export default function Home() {
    const [news, setNews] = useState()
    const getAllNews =  async ()=>{
        const res = await  axios.get("http://localhost:8080/api/news")
        setNews(res.data.content)
    }


    useEffect(() => {
        getAllNews()
        window.scrollTo(0, 0)
    }, [])
    if(!news){
        return null;
    }
    return (
        <>
            <div id="demo" className="carousel slide slides d-flex container" data-bs-ride="carousel"
                 style={{marginTop: "10vh", paddingLeft: "", top: "3vh"}}>
                <div className="carousel-inner col-md-6"
                     style={{width: "600px", borderRadius: "10px", boxShadow: "gray 4px 4px 9px", padding: "0"}}>
                    <div className="carousel-item active">
                        <img src="/anh/slide1.jpg" alt="Los Angeles" className="d-block" style={{width: "100%"}}/>
                    </div>
                    <div className="carousel-item">
                        <img src="/anh/slide2.jpg" alt="Chicago"
                             className="d-block"
                             style={{width: "100%"}}/>
                    </div>
                    <div className="carousel-item">
                        <img src="/anh/slide3.jpg" alt="New York"
                             className="d-block" style={{width: "100%"}}/>
                    </div>
                    <div>
                        <button className="btn-slide" type="button" data-bs-target="#demo" data-bs-slide="prev" style={{
                            position: "absolute",
                            top: "40%",
                            background: "none",
                            border: "none"

                        }}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </div>

                    <div>
                        <button className="btn-slide" type="button" data-bs-target="#demo" data-bs-slide="next" style={{
                            position: "absolute",
                            top: "40%",
                            right: "0",
                            background: "none",
                            border: "none"
                        }}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-center" align="center">
                        <h1 style={{
                            fontFamily: "emoji",
                            fontWeight: "bold"
                        }}>K - GUARD SHOP</h1>
                        <hr style={{
                            boxShadow: "0px 3px 10px #ff9300",
                            borderBottom: "1px solid #ff8c00d9",
                            width: "30vw",
                        }}/>
                        {/*<p style={{fontWeight: "500"}}>An Tâm Vượt Mọi Nẻo Đường - K-Guard: Đơn vị chuyên cung cấp dịch*/}
                        {/*    vụ*/}
                        {/*    bảo hộ khi đi xe máy hàng*/}
                        {/*    đầu!</p>*/}
                    </div>
                    <p style={{textAlign: "justify"}}>
                        Hãy để K-Guard mang đến cho bạn sự yên tâm và tin tưởng trên mỗi hành trình. Ghé thăm cửa hàng
                        của
                        chúng tôi ngay hôm nay và trang bị cho mình những sản phẩm bảo hộ chất lượng hàng đầu. Chúng tôi
                        tin
                        rằng, với K-Guard, bạn có thể thoải mái khám phá thế giới xung quanh mà không phải lo lắng về an
                        toàn!"
                    </p>
                </div>
            </div>

            <div className="container " style={{marginTop: "7vh"}}>
                <div className="row mb-3" align="center">
                    {/*<h1>K - GUARD SHOP</h1>*/}
                    {/*<hr style={{*/}
                    {/*    boxShadow: "0px 3px 10px #ff9300",*/}
                    {/*    borderBottom: "1px solid darkorange"*/}
                    {/*}}/>*/}
                    <h5 style={{fontWeight: "500"}}>An Tâm Vượt Mọi Nẻo Đường - K-Guard: Đơn vị chuyên cung cấp dịch vụ
                        bảo hộ khi đi xe máy hàng
                        đầu!</h5>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        <img src="https://pystravel.vn/uploads/posts/albums/492/739728d9156ead287034aa319a26a2d4.jpg"
                             alt="" style={{width: "250px", borderRadius: "10px"}}/>
                    </div>
                    <div className="col-9 d-flex align-items-center">
                        <div className="row">
                            <p style={{textAlign: "justify"}} className="col-md-12">Bạn đam mê cảm giác tự do trên nẻo
                                đường, nhưng không thể không lo
                                lắng về an toàn của mình?
                                Hãy để K-Guard đồng hành cùng bạn trong mỗi hành trình! Chúng tôi tự hào là đơn vị uy
                                tín,
                                chuyên nghiệp, và luôn đặt an toàn của khách hàng lên hàng đầu.</p>
                            <p style={{textAlign: "justify"}} className="col-md-12">Với đội ngũ nhân viên chuyên nghiệp
                                và tận tâm, K-Guard cam kết
                                cung cấp các sản phẩm bảo hộ
                                chất lượng cao nhất. Tại cửa hàng, bạn sẽ dễ dàng tìm thấy các loại mũ bảo hiểm, găng
                                tay
                                chống trầy, áo giáp chắn gió, và nhiều phụ kiện bảo hộ khác, phục vụ đa dạng nhu cầu của
                                bạn.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 d-flex align-items-center">
                        <div className="row">
                            <p style={{textAlign: "justify"}} className="col-md-12">Không chỉ đơn thuần là một cửa hàng
                                bảo hộ, K-Guard còn là người
                                bạn đồng hành đáng tin cậy. Chúng tôi sẵn sàng tư vấn và giúp bạn lựa chọn những sản
                                phẩm phù hợp nhất với phong cách và nhu cầu cá nhân. An toàn của bạn là niềm tự hào và
                                niềm hạnh phúc của chúng tôi.</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <img
                            src="https://motoviet.net/wp-content/uploads/2020/07/nhungcaisuongkhiphuotxemay-5-1581680036-1.jpg"
                            alt="" style={{width: "260px", borderRadius: "10px"}}/>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12 text-center d-flex">
                        <div className="col-md-4">
                            <hr/>
                        </div>
                        <h3 className=" col-md-4 sub-title-product">SẢN PHẨM NỔI BẬT </h3>
                        <div className="col-md-4">
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <FullFaceHot/>
                </div>

                <div className="row pt-5">
                    <div className="col-md-12 text-center d-flex">
                        <div className="col-md-4">
                            <hr/>
                        </div>
                        <h3 className=" col-md-4 sub-title-product">TRANG BỊ BẢO HỘ</h3>
                        <div className="col-md-4">
                            <hr/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3 guard-items">
                                <Link to={`/product/glove`}>
                                    <div className="guard-items-home">
                                        <img
                                            src="https://product.hstatic.net/1000325215/product/ego-camo-hong-dai-ngon_master.jpg"
                                            alt="" style={{width: "100%"}}/>
                                        <div className="guard-items-content">
                                            <b>Găng tay</b>
                                            <hr className="hr-guard"/>
                                            <p>Găng tay bảo hộ đi xe máy an toàn, êm ái.</p>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3 guard-items">
                                <Link to={`/product/fullface`}>
                                    <div className="guard-items-home">
                                        <img
                                            src="https://x135shop.vn/wp-content/uploads/2020/12/125054518_1000345630475047_3941925206897407637_o-300x300.jpg"
                                            alt="" style={{height: "100%"}}/>
                                        <div className="guard-items-content">
                                            <b>Mũ bảo hiểm</b>
                                            <hr className="hr-guard"/>
                                            <p>Nhiều loại mũ 3/4, Fullface chính hãng, giá tốt hiệu AGV, Yohe,
                                                Arai,KYT...</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3 guard-items">
                                <Link to={`/product/armor`}>
                                    <div className="guard-items-home">
                                        <img
                                            src="https://th.bing.com/th/id/R.69500be00c0cac645b18fd512865f797?rik=CUNOxbrfAhvipA&riu=http%3a%2f%2fwww.phukienphuot.com%2fuploads%2fimages%2fmedium%2fIMG_4732.JPG&ehk=adHLdlNr7BrMYvHWowVYsnROQ0mHx6aAplQpU9Veljo%3d&risl=&pid=ImgRaw&r=0"
                                            alt="" style={{height: "100%"}}/>
                                        <div className="guard-items-content">
                                            <b>Áo khoác giáp</b>
                                            <hr className="hr-guard"/>
                                            <p>Đảm bảo an toàn cho cơ thể, giảm thiểu các vấn đề về chấn thương.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3 guard-items">
                                <Link to={`/product/barrel`}>
                                    <div className="guard-items-home">
                                        <img
                                            src="http://www.phukienphuot.com/uploads/images/medium/thung_xe_k1300r_11.JPG"
                                            alt="" style={{height: "100%"}}/>
                                        <div className="guard-items-content">
                                            <b>Baga - Thùng Givi</b>
                                            <hr className="hr-guard"/>
                                            <p>Lắp đặt baga Givi chính hãng, tiện lợi hơn trong các chuyến đi.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row mt-4 ">
                            <div className="col-md-3">
                                <div className="guard-items-home-sub-first">
                                    <div className="guard-items-home-sub-second">
                                        <i className="bi bi-shield-shaded"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="guard-items-home-sub-first">
                                    <div className="guard-items-home-sub-second">
                                        <i className="bi bi-star-half"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="guard-items-home-sub-first">
                                    <div className="guard-items-home-sub-second">
                                        <i className="bi bi-cash-coin"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="guard-items-home-sub-first">
                                    <div className="guard-items-home-sub-second">
                                        <i className="bi bi-truck"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row mt-4">
                            <div className=" text-center col-md-3">
                                <b>AN TOÀN</b>
                                <p>Your safety, our safety K-GUARD luôn nghiên cứu các sản phẩm với tiêu chí an toàn
                                    đặt lên hàng đầu.</p>
                            </div>
                            <div className="text-center  col-md-3">
                                <b>CHẤT LƯỢNG</b>
                                <p>Chúng tôi mang đến những sản phẩm chính hãng đến từ các thương hiệu nổi tiếng được
                                    các biker tin dùng.
                                </p>
                            </div>
                            <div className=" text-center col-md-3">
                                <b>GIÁ HỢP LÝ</b>
                                <p>Với tiêu chí dẫn đầu về giá, Tài Đạt tự tin mang đến mức giá mọi lứa tuổi đều có thể
                                    mua được.</p>
                            </div>
                            <div className="  text-center col-md-3">
                                <b>SHIP TOÀN QUỐC</b>
                                <p>Nhận thanh toán trả trước (chuyển khoản) và trả sau qua đường bưu điện (COD).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="col-md-12 text-center d-flex">
                        <div className="col-md-5">
                            <hr/>
                        </div>
                        <h3 className=" col-md-2 sub-title-product">Tin tức</h3>
                        <div className="col-md-5">
                            <hr/>
                        </div>
                    </div>
                    <marquee behavior="scroll" direction="right" scrollamount="20"></marquee>
                    <Carousel interval={1000}>
                        <Carousel.Item>
                            <div
                                className="row portfolio-container"
                                data-aos="fade-up"
                                data-aos-delay={1000}
                            >
                                {
                                    news && news.map((item,index)=>
                                        <Link key={index} to={`/post`} className="col-md-3 product-link py-2">
                                            <div className="card-post-home">
                                                <span className="sale">HOT</span>
                                                <div className="image" style={{minHeight: "10rem"}}>
                                                    <img style={{maxHeight: "10rem"}}
                                                         src={item.image}/>
                                                </div>
                                                <div className="details" style={{minHeight:"7rem"}}>
                                                    <p>{item.title}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div
                                className="row portfolio-container"
                                data-aos="fade-up"
                                data-aos-delay={1000}
                            >
                                {
                                    news && news.map((item,index)=>
                                        <Link key={index} to={`/post`} className="col-md-3 product-link py-2">
                                            <div className="card-post-home">
                                                <span className="sale">HOT</span>
                                                <div className="image" style={{minHeight: "10rem"}}>
                                                    <img style={{maxHeight: "10rem"}}
                                                         src={item.image}/>
                                                </div>
                                                <div className="details" style={{minHeight:"7rem"}}>
                                                    <p>{item.title}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <BackUp/>
            <ToastContainer/>
        </>
    )
}