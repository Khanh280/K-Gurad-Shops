import React from "react";
import {animateScroll as scroll} from "react-scroll";

export default function BackUp() {
    const backUp = ()=>{
        scroll.scrollToTop();
    }
    return (
        <div className="back-up">
            <i className="bi bi-arrow-up-circle justify-content-end d-flex" onClick={() => backUp()}></i>
        </div>
    )
}