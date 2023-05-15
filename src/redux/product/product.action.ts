import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../modules/product/models/IProducts";
import { ProductService } from "../../modules/product/services/productService";

export const getContactAction: any = createAsyncThunk( "product/getAllProductAction",
  async (payload:{}, { rejectWithValue }): Promise<IProduct[] | any> => {
    try {
     
      let response = await ProductService.getAllProducts();
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      } 
      return rejectWithValue(error.response.data)
    }
   
  }
);


export const getsingleProductAction: any = createAsyncThunk('contacts/getsingleProductAction',
    async (payload: { id: string }, {rejectWithValue}): Promise<IProduct | any> => {
        try {
            const {id} = payload;
            let response = await ProductService.getSingleProducts(id);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    })


export const deleteContactAction: any = createAsyncThunk( "product/deleteProductAction",
  async (payload:{id: string | undefined}, { rejectWithValue }): Promise<IProduct[] | any> => { 
    try { 
        const{id} = payload
        let response = await ProductService.deleteProduct(id);
      return response;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data)
    }
   
  }
);


export const createContactAction: any = createAsyncThunk( "product/createProductAction",
  async (product:IProduct, { rejectWithValue }): Promise<IProduct[] | any> => { 
    try { 
      let response = await ProductService.addProduct(product);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data)
    }
   
  }
); 


export const editContactAction: any = createAsyncThunk( "product/editContactAction",
  async (payload : {id:string | undefined, product:IProduct}, { rejectWithValue }): Promise<IProduct[] | any> => { 
    try { 
     
      const{product, id} = payload
      let response = await ProductService.editProduct(product, id); 
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data)
    }
   
  }
);
