import axios from "axios";
export const getToken = async ()=>{
    return localStorage.getItem("token")
}
export const getAllProduct = async (nameType, orderBy, brand, nameSearch) => {
    try {
        const res = await axios.get("http://localhost:8080/api/product?productType=" + (nameType || "") + "&orderBy=" + (orderBy || "") + "&brand=" + (brand || "") + "&nameSearch=" + (nameSearch || ""),
        {
            headers: {
                "Authorization": "Bearer " + await getToken()
            }
        })
        return res;
    } catch (e) {
        return null;
    }

}
export const getAllProductManager = async (page, nameSearch, orderBy) => {
    try {
        const res = await axios.get("http://localhost:8080/api/product/product-manager?page=" + page + "&nameSearch=" + (nameSearch || "") + "&orderBy=" + (orderBy || ""),
            {
                headers: {
                    "Authorization": "Bearer " + await getToken()
                }
            })
        return res;
    } catch (e) {
        return null;
    }

}
export const getAllProductType = async () => {
    const res = await axios.get("http://localhost:8080/api/product/product-type",{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}
export const getAllBrand = async () => {
    const res = await axios.get("http://localhost:8080/api/product/brand",{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}

export const getAllProductByType = async (type) => {
    const res = await axios.get("http://localhost:8080/api/product?productType=" + type,{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}

export const getAllProductByBrand = async (brand) => {
    const res = await axios.get("http://localhost:8080/api/product?brand=" + brand,{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}
export const getSize = async () => {
    const res = await axios.get("http://localhost:8080/api/product/size",{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}

export const loadMore = async (page, type, brand, orderBy, nameSearch, totalPage) => {
    if (page + 1 < totalPage) {
        const res = await axios.get("http://localhost:8080/api/product?page=" + (page + 1) + "&productType=" + (type || "") + "&brand=" + (brand || "") + "&orderBy=" + (orderBy || "") + "&nameSearch=" + (nameSearch || ""),{
            headers: {
                "Authorization": "Bearer " + await getToken()
            }
        })
        return res;
    }
}
export const getProductById = async (id) => {
    const res = await axios.post("http://localhost:8080/api/product/detail", id, {
        headers: {
            'Content-Type': 'text/plain', // Set the Content-Type header to indicate the raw data format
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}
export const getTop4Product = async () => {
    const res = await axios.get("http://localhost:8080/api/product/top-product/4",{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
    return res;
}

export const saveProduct = async (product) => {
    await axios.post("http://localhost:8080/api/product", product,{
        headers: {
            "Authorization": "Bearer " + await getToken()
        }
    })
}