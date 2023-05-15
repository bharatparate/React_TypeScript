import {configureStore, Store} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {useDispatch} from "react-redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

const store: Store = configureStore({
    reducer: rootReducer,
    middleware: [logger, thunk]
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()