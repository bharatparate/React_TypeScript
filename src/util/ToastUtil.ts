import { toast } from "react-toastify";

export class ToastUtil{
    public static displaySuccessMessage(message:string){
        return toast.success(message)
    }

    public static displayErrorMessage(message:string){
        return toast.error(message)
    }
}