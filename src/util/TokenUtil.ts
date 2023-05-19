export class TokenUtil{

    private static TOKEN_KEY:string = "product-token";

    public static saveTokenToSession(token:string){
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    public static removeTokenFromSession(){
        sessionStorage.removeItem(this.TOKEN_KEY);
    } 

     public static getToken(){
       return sessionStorage.getItem(this.TOKEN_KEY);
    }

    public static isLoggedIn(){
        const token = this.getToken()
       
         if(token){
            return true;
        }
        else{
            return false;
        }
    }
}