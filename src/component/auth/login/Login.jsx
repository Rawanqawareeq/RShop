import React, { useContext } from 'react'
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../web/validate/Validate.js';
import UserContex from '../../web/context/User.jsx';
import Input from '../../pages/Input.jsx';
export default function Login() {
  let {UserToken,setUserToken} = useContext(UserContex);
    const navigate = useNavigate();
    
    if(UserToken){
      navigate(-1);
    }
    const initialValues={
        email:'',
        password:'',
      };
      
      const onSubmit=async users=>{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);
        if(data.message == 'success'){
         localStorage.setItem("UserToken",data.token);
         setUserToken(data.token);
         toast.success('login successfuly', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
            navigate('/');
        }
      };
      const formik = useFormik({
          initialValues,
          onSubmit,
          validationSchema:loginSchema
        });
      const inputs =[
        { 
          id:'email',
          type: 'email',
          name:'email',
          title:'User Email',
          value:formik.values.email,
    
        },
        {
          id:'password',
          type:'password',
          name:'password',
          title :'User Password',
          value:formik.values.password,
        }
      ];
      const renderInputs = inputs.map((input,index)=>
        <Input 
        type={input.type} 
        id={input.id} 
         name={input.name} 
         title={input.title}
         value={input.value}  
         key={index} 
         errors={formik.errors}
         onChange={input.onChange||formik.handleChange}
         onBlur={formik.handleBlur}
         touched={formik.touched}
        />
    
      
      );
      return (
        <>
        <div className='container'>
        <form onSubmit={formik.handleSubmit}>
          {renderInputs}
          <Link to='/sendcode'>Rest Password ?</Link>
          <button type='submit' >Login</button>
         </form>
        </div>
        </>
      )
}
