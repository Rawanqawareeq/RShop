import React  from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { reviewSchema } from '../validate/Validate';
import axios from 'axios';

export default function Review() {
  const {productsId} = useParams();

  const navigate = useNavigate();

  const initialValues={
    comment:'',
    rating:'',
  };
  const onSubmit=async(review)=>{
    const token = localStorage.getItem("UserToken");
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productsId}/review`,review,
    {headers:{Authorization:`Tariq__${token}`}});
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:reviewSchema
  });
  const inputs =[
    { 
      id:'comment',
      type: 'text',
      name:'comment',
      title:'User comment',
      value:formik.values.comment,

    },
    {
      id:'rating',
      type:'text',
      name:'rating',
      title :'User rating',
      value:formik.values.rating,
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
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         touched={formik.touched}
        />
    
      
      );
  return (
    <>
    <div className='form mt-5  py-5'>

    <form className='content ms-3 py-5' onSubmit={formik.handleSubmit}>
      {renderInputs}
      <button type='submit' className='mt-2 submit'>Review</button>
     </form>
   
    </div>
    </>
  )
}
