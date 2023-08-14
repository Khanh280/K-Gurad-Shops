import axios from "axios";
const token = localStorage.getItem("token")
export const getAllProduct = async (nameType, orderBy, brand, nameSearch) => {
    try {
        const res = await axios.get("http://localhost:8080/api/product?productType=" + (nameType || "") + "&orderBy=" + (orderBy || "") + "&brand=" + (brand || "") + "&nameSearch=" + (nameSearch || ""))
        return res;
    } catch (e) {
        return null;
    }

}
export const getAllProductManager = async (page) => {
    try {
        const res = await axios.get("http://localhost:8080/api/product/product-manager?page="+ page,
            {
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
        return res;
    } catch (e) {
        return null;
    }

}

export const saveCustomer = async (customer) => {
    await axios.post("http://localhost:8080/api/customer", customer)
}