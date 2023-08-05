import axios from "axios";

export const saveCustomer = async (customer)=>{
    await axios.post("http://localhost:8080/api/customer",customer)
}