import React, { FunctionComponent, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { IProduct } from "../models/IProducts";
import { default as axios } from "axios";
import Heading from "../../../components/Heading";
import Loader from "../../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import * as  productActions from "../../../redux/product/product.action"
import * as  productreducer from "../../../redux/product/product.reducer"
import { useSelector } from "react-redux";

const AdminProducts: React.FC = () => {


  const dispatch:AppDispatch = useAppDispatch();

const productState:productreducer.InicialState = useSelector((store:RootState)=>{
return store[productreducer.productFeatureKey]
})

  useEffect(() => {
    dispatch(productActions.getContactAction())
  }, []);

  const {product, errorMessage, loading} = productState;


  // const [product, setProduct] = useState<any[]>([]);
  // const [errorMessage, setErrorMEssage] = useState(null);
  // const [loading, setLoading] = useState<Boolean>(false);


  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();
  // sorting
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleSort = (columnName:any) => {
    // const direction = sortColumn === columnName && sortDirection === "asc" ? "desc" : "asc";
    // const sortedData = [...product].sort((a, b) => {
    //   if (a[columnName].toLowerCase() < b[columnName].toLowerCase()) {
    //     return direction === "asc" ? -1 : 1;
    //   }
    //   if (a[columnName].toLowerCase() > b[columnName].toLowerCase()) {
    //     return direction === "asc" ? 1 : -1;
    //   }
    //   return 0;
    // });
    // setProduct(sortedData);
    // setSortColumn(columnName);
    // setSortDirection(direction);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.from(product).slice(firstIndex, lastIndex);
  const npage = Math.ceil( Array.from(product).length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changePage = (id: number) => {
    setCurrentPage(id);
  };

  // const loadData = async() => {
  //   setLoading(true);
  //   await ProductService.getAllProducts().then((response: any) => {
  //       setProduct(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setErrorMEssage(error.message);
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => { 
  //   loadData();
  // }, []);

  const deleteContact = async(id: string | undefined) => {
    // setLoading(true);
    // let result = await ProductService.deleteProduct(id);
    //   loadData();
    //   setLoading(false);
      
    //   console.log(result);
    
    //   toast.success("Deleted Successfully !", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });

    //     if (records.length < 2) {
    //         setCurrentPage(currentPage - 1);
    //     }
    dispatch(productActions.deleteContactAction({id: id}));
    setTimeout(() => {
      dispatch(productActions.getContactAction());
    }, 100);
    
  };

  return (
    <>
      <Navbar navbar={"Logo"} />

      <div className="container">
        <Heading heading={"Admin Products"} />
        
        {loading && <Loader />}
        <Link to="/admin/addroduct">
          <button className="btn btn-success">Add</button>
        </Link>
        <br></br>
        <br></br>

        <input
          type={"text"}
          value={searchValue}
          placeholder="Search by name"
          className="form-control"
          onChange={(e) => setSearchValue(e.target.value)}
        />
       

        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th onClick={() => handleSort("name")} scope="col">
                Name
              </th>
              <th onClick={() => handleSort("price")} scope="col">
                Price
              </th>
              <th onClick={() => handleSort("quantity")} scope="col">
                Quantity
              </th>
              <th onClick={() => handleSort("category")} scope="col">
                Category
              </th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {errorMessage && <h1 className="text-danger">{errorMessage}</h1>}
            {records ? (
              records
                .filter((value) => {
                  if (searchValue == "") {
                    return value;
                  } else if (
                    value.name
                      .toLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={product.imgUrl}
                          style={{ width: 50, height: 50 }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.categoryId}</td>
                      <td>{product.description}</td>
                      <td>
                        <Link
                          to={`/admin/update/${product._id}`}
                          className="btn btn-warning"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteContact(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td>No products</td>
              </tr>
            )}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prevPage}>
                Prev
              </a>
            </li>
            <>
              {numbers &&
                numbers.map((numbertext, i) => {
                  return (
                    <li
                      className={`page-item ${
                        currentPage == numbertext ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        href="#"
                        className="page-link"
                        onClick={() => changePage(numbertext)}
                      >
                        {numbertext}
                      </a>
                    </li>
                  );
                })}
            </>
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminProducts;
