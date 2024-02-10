import { useQuery } from 'react-query';
import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CategoriesDetails() {
    const {catogoryId} = useParams();
    const getCategoriesDetails= async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${catogoryId}`);
        return data;
    }
    const {data,isLoading}= useQuery('CategoriesDetails',getCategoriesDetails);
    if(isLoading){
        return <h2>is Loading ...</h2>
    }
  
  return (
   <div className='container'>
     <div className='row '>
    {data?.products.length?data.products.map((product)=>
            
            <div className='products col-md-4 py-5 text-center' key={product._id}>
                <img src={product.mainImage.secure_url}/>
                   <h5 className='py-3'>{product.name}</h5>
                   <p>{product.price}$</p>
                  
                   <Link to={`/products/${product._id}`}>Details</Link>
                   
            </div>
        ):<h2>no products</h2>}
    </div>
    

   </div>
  )
}
