import axios from "axios";

const token = localStorage.getItem("token")
export const saveShoppingCartCustomer = async (productCart) => {
    const res = await axios.post("http://localhost:8080/api/shopping-cart/save-product", productCart,
        {
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    return res;
}
export const saveShoppingCartSession = async (productCart) => {
    const res = await axios.post("http://localhost:8080/api/shopping-cart", productCart, {withCredentials: true})
    return res;
}
export const getAllCart = async (isLogin) => {
    const res = await axios.post("http://localhost:8080/api/shopping-cart/showCart", `${isLogin}`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "text/plain",
                "Authorization": "Bearer " + token
            }
        }
    )
    return res;
}
export const editQuantity = async (operator, id, isLogin) => {
    const res = await axios.post("http://localhost:8080/api/shopping-cart/edit-cart/" + operator + "/" + (+id),
        `${isLogin}`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "text/plain",
                "Authorization": "Bearer " + token
            }
        })
    return res;
}
export const deleteCartLogin = async (id) => {
    const res = await axios.post("http://localhost:8080/api/shopping-cart/delete-cart-login", id, {
        withCredentials: true,
        headers: {
            "Content-Type": "text/plain",
            "Authorization": "Bearer " + token
        }
    })
    return res;
}
export const deleteCartSession = async (id) => {
    const res = await axios.post("http://localhost:8080/api/shopping-cart/delete-cart-session", id, {
        withCredentials: true,
        headers: {
            "Content-Type": "text/plain"
        }
    })
    return res;
}
