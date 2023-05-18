import axios from 'axios';
import { IProduct } from '../models/IProducts';

export class ProductService {
    private static serverUrl : string = process.env.REACT_APP_EXPRESS_SERVER_URL? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    public static getAllProducts():Promise<{data : IProduct[]}>{
        return axios.get(`${this.serverUrl}/product`) 
    }

    public static addProduct(product:IProduct):Promise<{data : IProduct[]}>{
        return axios.post(`${this.serverUrl}/product/add`, product)
    }

    public static editProduct(product:IProduct, id:string | undefined):Promise<{data : IProduct[]}>{
       return axios.put(`${this.serverUrl}/product/${id}`, product)
    }

    // get single product 
    public static getSingleProducts(id:string | undefined):Promise<{data : IProduct[]}>{
        return axios.get(`${this.serverUrl}/product/${id}`)
    }

    public static deleteProduct(id: string | undefined):Promise<{}>{
        return axios.delete(`${this.serverUrl}/product/${id}`);
    }

    public static getAllCategory():Promise<{data : IProduct[]}>{
        return axios.get(`${this.serverUrl}/getCategory`)
    }

}