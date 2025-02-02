import axios from "axios";

export const createProduct = async(token,form) => {

    return axios.post('http://localhost:5002/api/product',form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async(token,count = 20) => {

    return axios.get('http://localhost:5002/api/products/'+count,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async(token,form) => {

    return axios.post('http://localhost:5002/api/images',{
        image: form
    }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async(token,public_id) => {

    return axios.post('http://localhost:5002/api/removeimages',{
        public_id
    }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}