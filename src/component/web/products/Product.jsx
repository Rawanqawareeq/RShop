import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { CartContex } from '../context/Cart.jsx';
import { Bounce, toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";

export default function Product() {
  const {productsId} = useParams();
  const {addCartContex}= useContext(CartContex);
  const [data,setData] = useState(null);
  const [isLoading,setisLoading] = useState(true);
  const [avgrat,setAvgrat] = useState(0);
  const getProducts= async()=>{
     try{ 
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productsId}`);
      console.log(data);
      setData(data);
      setisLoading(false);
      return data.product;
    }
      catch(error){

      }
  }
  const getavgrev = async(product)=>{
    let sum = 0;
    const{ data }= await axios.get(`${import.meta.env.VITE_API_URL}/products/${productsId}`);
    data.product.reviews.map((review)=>
   (sum = sum + review.rating)
    );
   sum = Math.round(sum/data.product.reviews.length);
   setAvgrat(sum);
    return sum;
  }
  
  const addtocart  = async (productid)=>{
    const res = await addCartContex(productid);
    console.log(res);
    
    if(res.message == 'success'){
      toast.success('Product Add successfuly', {
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
     }
    return res;
  

}
useEffect(()=>{
  getProducts();
  getavgrev();
},[])
  return (
  <>
  {isLoading==false?<div className='container py-5 Productsdes ' >
    <div className='row'>
      <div className='col-md-12 text-center'>
       <img src={data.product.mainImage.secure_url} height='500px' ></img>
       <div className='container py-5'>
      <div className='row Productsdes-subimg' >  
     { data.product.subImages.map((img)=> <img src={img.secure_url}  key={img.public_id} />)
}
      </div>       
      </div>
      <Link to={`/products/${productsId}/review`}>add review</Link>
       <p>avg rating :{[...Array(5)].map((star,index) => {  return <FaStar size={50} color={index < avgrat?'#ffc107':'e4e5e9'} key={index}/>})}</p>
       <h5 className='pt-5 pe-5 text-start'>{data.product.name}</h5>
           <p className=' text-start'>{data.product.finalPrice}$</p>
           {console.log(data)}
           <button className='btn btn-outline-info d-block px-5 m-auto text-center' onClick={()=>addtocart(data.product._id)} >Add to Cart</button>
      <div className='border-2 border-black '> 
      {data.product.reviews.map((review)=><div key={review._id}>
      <h3>{review.createdBy.userName}</h3>
        <p>{review.comment}</p>
       {[...Array(5)].map((star,index) => { return <FaStar size={50} color={index <= review.rating?'#ffc107':'e4e5e9'} key={index}/>})}
       </div>)}
      </div>
      </div>
      <div className='col-md-12 py-5'>
    
     
      </div>
    </div>
  </div>:<h2>is Loading...</h2>}
 
  </>
  )
}
