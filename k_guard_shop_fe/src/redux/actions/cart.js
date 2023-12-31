import axios from "axios";
import {GET_ALL_CART, UPDATE_CART} from "./type";
import * as ProductService from "../../service/ProductService"

export const updateCart = (quantity) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_CART,
            payload: quantity
        })
    } catch (e) {
    }
}

export const getAllCart = (isLogin) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:8080/api/shopping-cart/showCart", `${isLogin}`,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "text/plain",
                    "Authorization": "Bearer " + await ProductService.getToken()
                }
            })
        dispatch({
            type: GET_ALL_CART,
            payload: res.data.length
        })
    } catch (e) {
    }
}