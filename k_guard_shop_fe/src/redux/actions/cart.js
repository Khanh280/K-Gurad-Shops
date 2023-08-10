import axios from "axios";
import {GET_ALL_CART, UPDATE_CART} from "./type";

export const updateCart = (quantity) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_CART,
            payload: quantity
        })
    } catch (e) {
    }
}

export const getAllCart = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:8080/api/shopping-cart", {withCredentials: true})
        dispatch({
            type: GET_ALL_CART,
            payload: res.data.length
        })
    } catch (e) {
    }
}