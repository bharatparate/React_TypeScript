import {combineReducers} from "@reduxjs/toolkit";
import * as productReducer from './product/product.reducer'

const rootReducer: any = combineReducers({
    [productReducer.productFeatureKey] : productReducer.productSlice.reducer
});

export default rootReducer;