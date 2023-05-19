import React from "react";
import { Link } from "react-router-dom";
import { TokenUtil } from "../util/TokenUtil";
import { AppDispatch, useAppDispatch } from "../redux/store";
import { logOutUSerAction } from "../redux/users/user.reducer";

interface IProps{
    navbar: string
}

const App: React.FC<IProps> = (props) => {
  const dispatch: AppDispatch = useAppDispatch();
  const clickLogOff = () =>{
    dispatch({
      type: `${logOutUSerAction}`,
      payload: {}

    })
  }

  return (

    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {props.navbar}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/products">
                  Admin
                </Link>
              </li>
              {
                TokenUtil.isLoggedIn() ?  <li className="nav-item"> <Link to="/user/login" className="nav-link"><span onClick={clickLogOff}>Logout</span></Link>
              </li> : <li className="nav-item">
              <Link to="/user/login" className="nav-link">Login</Link>
              </li>
              }
             
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default App;
