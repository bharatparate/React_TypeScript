import axios from 'axios';
import { IProduct } from '../models/IProducts';

export class ProductService {
    private static serverUrl : string ="http://localhost:3001/api";

    public static getAllProducts():Promise<{data : IProduct[]}>{
        return axios.get(`${this.serverUrl}/get`) 
    }

    public static deleteProduct(id: string | undefined):Promise<{}>{
        return axios.delete(`${this.serverUrl}/delete/${id}`);
    }

    public static addProduct(product:IProduct):Promise<{data : IProduct[]}>{
        return axios.post(`${this.serverUrl}/insert/`, product)
    }

    public static editProduct(product:IProduct, id:string | undefined):Promise<{data : IProduct[]}>{
       return axios.put(`${this.serverUrl}/edit/${id}`, product)
    }

    // get single product
    public static getSingleProducts(id:string | undefined):Promise<{data : IProduct[]}>{
        return axios.get(`${this.serverUrl}/get/${id}`)
    }


    public static getAllCategory():Promise<{data : IProduct[]}>{
        return axios.get(`${this.serverUrl}/getCategory`)
    }
}