import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './modules/product/pages/Homepage';
import Products from './modules/product/pages/Products';
import AdminProducts from './modules/product/pages/AdminProducts';
import AddProduct from './modules/product/pages/AddProduct';
import ViewProduct from './modules/product/pages/ViewProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './modules/product/pages/EditProduct';
import UserLogin from './modules/user/pages/UserLogin';
import UserRegister from './modules/user/pages/UserRegister';


const App:React.FC = () => {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/admin/products' element={<AdminProducts/>}></Route>
        <Route path='/admin/addroduct' element={<AddProduct/>}></Route>
        <Route path='/admin/update/:id' element={<EditProduct/>}></Route>
        <Route path='/view/:id' element={<ViewProduct/>}></Route>
        <Route path='/user/login' element={<UserLogin/>}></Route>
        <Route path='/user/Register' element={<UserRegister/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
