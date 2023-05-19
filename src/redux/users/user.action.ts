import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../modules/user/models/IUser";
import { UserService } from "../../modules/user/services/userService";


export const registerUserAction: any = createAsyncThunk( "user/registerUserAction",
  async (payload:{user:IUser}, { rejectWithValue }): Promise<{msg: string, user: IUser[]} | any> => { 
      try { 
      const{user} = payload;
      let response = await UserService.registerUser(user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data)
    }
   
  }
); 


export const loginUserAction: any = createAsyncThunk( "user/loginUserAction",
  async (payload:{user:IUser}, { rejectWithValue }): Promise<{msg: string, token:string, user: IUser} | any> => { 
    try {
      
      const{user} = payload; 
      let response = await UserService.loginUser(user);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data)
    }
   
  }
); 

export const getUserInfoAction: any = createAsyncThunk( "user/getUserInfoAction",
  async (payload:{}, { rejectWithValue }): Promise<{user: IUser[]} | any> => { 
    try { 
      let response = await UserService.getUserInfo();
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data)
    }
   
  }
); 