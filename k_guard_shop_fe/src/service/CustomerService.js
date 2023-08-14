import axios from "axios";
const token = localStorage.getItem("token")
export const getCustomer = async ()=>{
    const res = await axios.get("http://localhost:8080/api/customer/detail", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return res;
}