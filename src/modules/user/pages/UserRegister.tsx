import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import { IUser } from '../models/IUser';
import { AppDispatch, useAppDispatch } from '../../../redux/store';
import * as userActions from '../../../redux/users/user.action'
import { useNavigate } from 'react-router-dom';



const UserRegister:React.FC = () => {

    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
 
const[user, setUser] = useState<IUser>({
    username: "",
    password: "",
    email:""
});


const updateInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setUser({
        ...user,
        [event.target.name]: event.target.value
    })
}

const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    dispatch(userActions.registerUserAction({user:user})).then((response:any)=>{
        if(response){
            navigate('/user/login')
        }
    })
}

  return (
    <>
         <Navbar navbar={"User Login"} />
         <div className="container">
            <form onSubmit={e => handleSubmit(e)}>
            <div className="row">
            <div className="col-sm-2">
                    <input type='text' name='username' value={user.username} onChange={e=>updateInput(e)} required={true} className='form-control' placeholder='Username'/ >
                                        </div>
                <div className="col-sm-2">
                    <input type='email' name='email' value={user.email} onChange={e=>updateInput(e)} required={true}  className='form-control' placeholder='email'/ >
                                        </div>
                <div className="col-sm-2">
                    <input type='password' name='password' value={user.password} onChange={e=>updateInput(e)} required={true}  className='form-control' placeholder='Password' />
                </div>
                <div className="col-sm-2">
                    <input type="submit" className="btn btn-success" value={'Register'} />
                </div>
            </div>
            </form>
         </div>
    </>
  );
}

export default UserRegister;