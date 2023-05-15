import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Heading from "../../../components/Heading";
import Navbar from "../../../components/Navbar";
import { ICategory, IProduct } from "../models/IProducts";
import { ProductService } from "../services/productService";

import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import * as productActions from "../../../redux/product/product.action";
import * as productreducer from "../../../redux/product/product.reducer";
import { useSelector } from "react-redux";
import axios from "axios";

const EditProduct: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryddl, setCategoryddl] = useState<ICategory[]>(
    [] as ICategory[]
  );

  const [localProduct, setLocalProduct] = useState<IProduct>({
    name: "",
    category: "",
    description: "",
    imgurl: "",
    price: "",
    quantity: "",
  });

  const contactReduxState: productreducer.InicialState = useSelector(
    (state: RootState) => {
      return state[productreducer.productFeatureKey];
    }
  );

  const { errorMessage, loading, product } = contactReduxState;

  const getContactInfoFromServer = (id: string) => {
   
    dispatch(productActions.getsingleProductAction({id}));
  };

  // const [product, setProduct] = useState<IProduct>({} as IProduct);

  const InputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ): void => {
    setLocalProduct({
      ...localProduct,
      [event.target.name]: event.target.value,
    });
  };

  const addProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !localProduct.price ||
      !localProduct.quantity ||
      !localProduct.imgurl ||
      !localProduct.description ||
      !localProduct.category
    ) {
      toast.error("Please Provide All the Details", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (id) {
        dispatch(
          productActions.editContactAction({
            product: localProduct,
            id: id,
          })
        ).then((response: any) => {
          if (response && !response.error) {
            navigate("/contacts/admin");
          }
        });
      }
      toast.success("Product Edited Successfully");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    }
  };

  useEffect(() => {
    if (id) {
      getContactInfoFromServer(id);
    }
  }, [id]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setLocalProduct({
        ...localProduct,
        name: product[0].name,
        category: product[0].category,
        description: product[0].description,
        imgurl: product[0].imgurl,
        price: product[0].price,
        quantity: product[0].quantity,
      });
    }
  }, [product]);

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

        <Heading heading={"Edit Product"} />

        <form onSubmit={(event) => addProduct(event)}>
          <div className="formgroup mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={localProduct.imgurl || ""}
              name="imgurl"
              type="text"
              className="form-control"
              placeholder="img URL"
            />
          </div>
          <div className="formgroup  mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={localProduct.name || ""}
              name="name"
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="formgroup  mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={localProduct.price || ""}
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
            />
          </div>
          <div className="formgroup  mb-3">
            <input
              onChange={(e) => InputOnChange(e)}
              value={localProduct.quantity || ""}
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Quantity"
            />
          </div>
          <div className="formgroup mb-3">
            <select
              className="form-control"
              value={localProduct.category || ""}
              name={"category"}
              onChange={(e) => InputOnChange(e)}
            >
              <option>Select Category</option>
              {categoryddl.map((category, index) => {
                return (
                  <option key={category.id} value={category.category || ""}>
                    {category.category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="formgroup  mb-3">
            <textarea
              onChange={(e) => InputOnChange(e)}
              value={localProduct.description || ""}
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

export default EditProduct;
