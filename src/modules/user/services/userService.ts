import axios from 'axios';
import { IUser } from '../models/IUser';

export class UserService {
    private static serverUrl : string = process.env.REACT_APP_EXPRESS_SERVER_URL? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    // public static getAllProducts():Promise<{data : IProduct[]}>{
    //     return axios.get(`${this.serverUrl}/product`) 
    // }

    public static registerUser(user:IUser):Promise<{data : {msg: string, user: IUser[]}}>{

        return axios.post(`${this.serverUrl}/users/register`, user)
    }


    public static loginUser(user:IUser):Promise<{data : {msg: string, token:string, user: IUser[]}}>{
        return axios.post(`${this.serverUrl}/users/login`, user)
    }

    public static getUserInfo():Promise<{data : {user: IUser}}>{
        return axios.get(`${this.serverUrl}/users/me`)
    }
  

}