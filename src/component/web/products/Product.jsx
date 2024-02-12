import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContex } from '../context/Cart.jsx';
import { Bounce, toast } from 'react-toastify';


export default function Product() {
  const {productsId} = useParams();
  const {addCartContex}= useContext(CartContex);
  const getProducts= async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productsId}`);
      return data.product;
  }
  const {data,isLoading}= useQuery('Products',getProducts);
  if(isLoading){
      return <h2>is Loading ...</h2>
  }
  const addtocart  = async (productid)=>{
    const res = await addCartContex(productid);
    
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
  return (
  <>
  <div className='container py-5 Productsdes ' >
    <div className='row'>
      <div className='col-md-12 text-center'>
       <img src={data.mainImage.secure_url} height='500px' ></img>
      </div>
      <div className='col-md-12 py-5'>
      <div className='container'>
      <div className='row Productsdes-subimg' >  

      </div> 
           <h5 className='pt-5 pe-5 text-start'>{data.name}</h5>
           <p className=' text-start'>{data.finalPrice}$</p>
           <button className='btn btn-outline-info d-block px-5 m-auto text-center' onClick={()=>addtocart(data._id)} >Add to Cart</button>     
      </div>
     
      </div>
    </div>
  </div>
 
  </>
  )
}
