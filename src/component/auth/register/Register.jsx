import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { validationSchema } from '../../web/validate/Validate.js';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Bounce, toast } from 'react-toastify';
export default function Register() {
  const initialValues={
    userName:'',
    email:'',
    password:'',
    image:null,
  };
  const handleFieldChange =(event)=>{
   formik.setFieldValue("image",event.target.files[0]);

  }
  const onSubmit=async users=>{
    const formData = new FormData();
    formData.append("userName",users.userName);
    formData.append("email",users.email);
    formData.append("password",users.password);
    formData.append("image",users.image);
   

    const {data} = await axios.post('https://ecommerce-node4.vercel.app/auth/signup',formData);
    if(data.message == 'success'){
      formik.resetForm();
      toast.success('Account Creating successfully, Plase verify your email to login', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:validationSchema
    });
  const inputs =[
    {
      id:'userName',
      type:'text',
      name:'userName',
      title:'User Name',
      value: formik.values.userName,
    },
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
    },
    {
      id:'image',
      type:'file',
      name:'image',
      title :'User Image ',
      onChange : handleFieldChange,
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
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data' >
      {renderInputs}
      <button type='submit' disabled={!formik.isValid} >Register</button>
     </form>
    </div>
    

    </>
  )
}

