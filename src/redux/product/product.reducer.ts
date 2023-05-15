import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { IProduct } from "../../modules/product/models/IProducts";
import * as produtAction from "./product.action"

export const productFeatureKey = "productFeature";

export interface InicialState {
    product: IProduct[];
    errorMessage: string | null;
    loading: Boolean;
}

const inicialState:InicialState = {
    product: [] as IProduct[],
    errorMessage: null,
    loading: false
}

export const productSlice = createSlice({
    
    name: "productSlice",
    initialState: inicialState,
    reducers:{},
    extraReducers: (builder)=>{
        
        builder.addCase(produtAction.getContactAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(produtAction.getContactAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.product = action.payload
        }).addCase(produtAction.getContactAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.errorMessage = action.payload.messge
            }
        })

        builder.addCase(produtAction.getsingleProductAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(produtAction.getsingleProductAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.product = action.payload
        }).addCase(produtAction.getsingleProductAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.errorMessage = action.payload.messge
            }
        })


        builder.addCase(produtAction.deleteContactAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(produtAction.deleteContactAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.product = action.payload
        }).addCase(produtAction.deleteContactAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.errorMessage = action.payload.messge
            }
        })

        // create Actions
        builder.addCase(produtAction.createContactAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(produtAction.createContactAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.product = action.payload
        }).addCase(produtAction.createContactAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.errorMessage = action.payload.messge
            }
        })

        // edit Actions
        builder.addCase(produtAction.editContactAction.pending, (state, action)=>{
            state.loading =true;
        }).addCase(produtAction.editContactAction.fulfilled, (state, action)=>{
            state.loading =false;
            state.product = action.payload
        }).addCase(produtAction.editContactAction.rejected, (state, action)=>{
            state.loading =false;
            if(isRejectedWithValue(action)){
                state.errorMessage = action.payload.messge
            }
        })
    }
})

