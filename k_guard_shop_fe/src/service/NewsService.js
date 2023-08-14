import axios from "axios";

export const getAllNews =  async ()=>{
    const res = await  axios.get("http://localhost:8080/api/news")
    return res;
}