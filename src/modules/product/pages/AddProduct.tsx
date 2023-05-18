
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Heading from "../../../components/Heading";
import Navbar from "../../../components/Navbar";
import { ICategory, IProduct } from "../models/IProducts";
import { ProductService } from "../services/productService";

import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import * as  productActions from "../../../redux/product/product.action"
import * as  productreducer from "../../../redux/product/product.reducer"
import { useSelector } from "react-redux";

const AddProduct: React.FC = () => {
  
  const dispatch:AppDispatch = useAppDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryddl, setCategoryddl] = useState<ICategory[]>([] as ICategory[]);

  const [product, setProduct] = useState<IProduct>({
    name:"",
    categoryId:"", 
    description:"",
    imgUrl:"", 
    price:"",
    quantity:""
  });

  const productState:productreducer.InicialState = useSelector((store:RootState)=>{
    return store[productreducer.productFeatureKey]
    })

  const InputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ): void => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  

  const addProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !product.price ||
      !product.quantity ||
      !product.imgUrl ||
      !product.description ||
      !product.categoryId
    ) {
      toast.error("Please Provide All the Details", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
       dispatch(productActions.createContactAction(product))

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    }
  };



  // useEffect(() => {
  //   dispatch(productActions.editContactAction(product, id))
  // }, [id]);

  useEffect(() => {
    ProductService.getAllCategory().then((response) => {
      setCategoryddl(response.data);
    });
  }, []);

  return (
    <>
      <Navbar navbar={"Logo"} />
      <div className="container">
        <ToastContainer />

        <Heading heading={"Add Product"} />

        <form onSubmit={(event) => addProduct(event)}>
          <div className="formgroup mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={product.imgUrl || ""}
              name="imgUrl"
              type="text"
              className="form-control"
              placeholder="img URL"
            />
          </div>
          <div className="formgroup  mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={product.name || ""}
              name="name"
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="formgroup  mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={product.price || ""}
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
            />
          </div>
          <div className="formgroup  mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={product.quantity || ""}
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Quantity"
            />
          </div>
          <div className="formgroup mb-3">
            <select
              className="form-control"
              value={product.categoryId || ""}
              name={"category"}
              onChange={(e) => InputOnChange(e)}
            >
              <option>Select Category</option>
              {categoryddl.map((category, index) => {
                return (
                  <option key={category._id} value={category._id || ""}>
                    {category._id}
                  </option>
                );
              })}
            </select>

          
          </div>
          <div className="formgroup  mb-3">
            <textarea
              onChange={(e) => InputOnChange(e)}
              value={product.description || ""}
              name="description"
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>
          
          <input type="submit" value={id ? "Update" : "Submit"} />
          <Link to={"/admin/products"} className="btn btn-warning">
            Go Back
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
