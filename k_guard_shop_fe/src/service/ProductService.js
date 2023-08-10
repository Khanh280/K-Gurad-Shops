import axios from "axios";

export const getAllProduct = async (nameType, orderBy, brand, nameSearch) => {
    try {
        const res = await axios.get("http://localhost:8080/api/product?productType=" + (nameType || "") + "&orderBy=" + (orderBy || "") + "&brand=" + (brand || "") + "&nameSearch=" + (nameSearch || ""))
        return res;
    } catch (e) {
        return null;
    }

}

export const saveCustomer = async (customer) => {
    await axios.post("http://localhost:8080/api/customer", customer)
}