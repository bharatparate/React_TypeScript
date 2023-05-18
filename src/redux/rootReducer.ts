import {combineReducers} from "@reduxjs/toolkit";
import * as productReducer from './product/product.reducer'
import * as userReducer from './users/user.reducer'

const rootReducer: any = combineReducers({
    [productReducer.productFeatureKey] : productReducer.productSlice.reducer,
    [userReducer.userFeatureKey] : userReducer.userSlice.reducer
});

export default rootReducer;