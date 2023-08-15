import axios from "axios";
import * as ProductService from "../service/ProductService"
export const saveOrders = async ()=>{
    const  res = await  axios.post("http://localhost:8080/api/orders","",{
        headers:{
            "Authorization": "Bearer " + await ProductService.getToken()
        }
    })
    return res;
}