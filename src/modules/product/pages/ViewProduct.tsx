import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import { IProduct } from "../models/IProducts";
import { ProductService } from "../services/productService";

const ViewProduct: React.FC = () => {
  const [product, setProduct] = useState({} as IProduct);
  const [errorMessage, setErrorMEssage] = useState(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    ProductService.getSingleProducts(id).then((response) => { 
      setProduct({ ...response.data[0] });
      setLoading(false);
    }).catch((error)=>{
        setErrorMEssage(error.message);
        setLoading(false);
    });
  }, [id]);

  return (
    <>
      <div className="container">
      {loading && <Loader />}
      {errorMessage && <h1 className="text-danger">{errorMessage}</h1>}
        <p>{product.imgUrl}</p>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>{product.categoryId}</p>
        <p>{product.description}</p>
        <Link to="/products" className="btn btn-warning">
          Back
        </Link>
      </div>
    </>
  );
};

export default ViewProduct;
