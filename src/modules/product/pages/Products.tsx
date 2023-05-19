import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { IProduct } from "../models/IProducts";
import { default as axios } from "axios";
import Heading from "../../../components/Heading";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import * as  productActions from "../../../redux/product/product.action"
import * as  productreducer from "../../../redux/product/product.reducer"
import { useSelector } from "react-redux";

const Products: React.FC = () => {

const dispatch:AppDispatch = useAppDispatch();

const productState:productreducer.InicialState = useSelector((store:RootState)=>{
return store[productreducer.productFeatureKey]
})

  useEffect(() => {
    dispatch(productActions.getContactAction())
  }, []);

  const {product, errorMessage, loading} = productState;

  return (
    <>
      <Navbar navbar={"Logo"} />
       
      <div className="container">
      <Heading heading={'Products'} />

      <div className="row"> 
      {loading && <Loader />}

    
        {product && product.length>0 ?  product.map((product, index) => {
            return (
                <div className="col-sm-3" key={index}>
                <div className="card">
                <img alt="" src={product.imgUrl} className="img-fluid"></img>
                <div className="card-body">
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                    <p>{product.description}</p>
                    <p><Link to={`/view/${product._id}`}>View</Link></p>
                </div>
                </div>
                
              </div>
            );
          }) : <h1>No products</h1>}
      </div>
      </div>
    </>
  );
};

export default Products;
