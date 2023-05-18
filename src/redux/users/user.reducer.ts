import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { IProduct } from "../../modules/product/models/IProducts";
import * as userAction from "./user.action"
import { IUser } from "../../modules/user/models/IUser";
import { TokenUtil } from "../../util/TokenUtil";

export const userFeatureKey = "userFeature";

export interface InicialState {
    user: IUser;
    errorMessage: string | null;
    loading: Boolean;
    token: string | null;
    isAuth: boolean;
}

const inicialState:InicialState = {
    user: {} as IUser,
    errorMessage: null,
    loading: false,
    isAuth:false,
    token:null
}


export const userSlice = createSlice({
    
    name: "userSlice",
    initialState: inicialState,
    reducers:{},
    extraReducers: (builder)=>{
        
        builder.addCase(userAction.registerUserAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(userAction.registerUserAction.fulfilled, (state, action)=>{
            state.loading =false;

        }).addCase(userAction.registerUserAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.errorMessage = action.payload
            }
        })

        builder.addCase(userAction.loginUserAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(userAction.loginUserAction.fulfilled, (state, action)=>{
            state.loading =false;
            
            // store token to session
            if(action.payload.token){
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuth= true;
                TokenUtil.saveTokenToSession(action.payload.token)
            }
            
        }).addCase(userAction.loginUserAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.user = {} as IUser;
                state.token = null;
                state.isAuth= false;
                TokenUtil.removeTokenFromSession();
                state.errorMessage = action.payload;
            }
        })



        builder.addCase(userAction.getUserInfoAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(userAction.getUserInfoAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.user = action.payload.user;
            state.isAuth= true;
            // store token to session
           
        }).addCase(userAction.getUserInfoAction.rejected, (state, action)=>{
            state.loading =false;
            state.user = {} as IUser;
            state.isAuth= false;
            if(isRejectedWithValue(action)){
                
                state.errorMessage = action.payload;
            }
        })


        
    }
    });