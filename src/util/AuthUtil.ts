import axios from "axios";
import { TokenUtil } from "./TokenUtil";

export class AuthUtil{

    public static isSetTokenToHeader():boolean{
        let isSuccess : boolean = false
      
        if(TokenUtil.isLoggedIn()){
            const token = TokenUtil.getToken();
            if(token){
                axios.defaults.headers['x-auth-token'] = token;
                return isSuccess = true
            }else{
                delete axios.defaults.headers['x-auth-token'];
                return isSuccess = false
            }
        }
        return isSuccess;
    }
}