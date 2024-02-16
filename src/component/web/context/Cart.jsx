import axios from "axios";
import { createContext, useState } from "react";
import React from 'react'
import { Bounce, toast } from "react-toastify";


export const CartContex = createContext(null);

export default function CartContexProvider({children}) {
   let [count,setcount] = useState(0);

  const addCartContex = async (productId)=>{
    try{
          const token = localStorage.getItem("UserToken");
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
          {productId},
          {headers:{Authorization:`Tariq__${token}`}});
          getcountCartContext();
            return data;
    }catch(error){
       ;
    }

  }
  const getCartContext=async ()=>{
    try{
         const token = localStorage.getItem("UserToken");
         const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
         {headers:{Authorization:`Tariq__${token}`}});
         console.log(data);
         return data;
    }catch(error){
        
    }
  }
  const getcountCartContext=async ()=>{
    try{
         const token = localStorage.getItem("UserToken");
         const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
         {headers:{Authorization:`Tariq__${token}`}});
         data.products.map((product)=>{
          setcount(count + (data.count*product.quantity));
         })
        
         return data.count;
     
    }catch(error){
       
    }
  }
  const removeCartContext = async(productId)=>{
    try{
      const token = localStorage.getItem('UserToken');
      const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
      {productId},
      {headers:{Authorization:`Tariq__${token}`}});
      return data;
    }catch(error){
       console.log(error);
    }
  }
  const clearCart= async()=>{
    if(count <= 0){
      toast.error('The cart is empty', {
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
  else{
    try{
      const token = localStorage.getItem('UserToken');
      const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{},
      {headers:{authorization:`Tariq__${token}`}})
      return data;
     }catch(error){
      console.log(error);
     }
  }}
  const incraseQuantityContext= async(productId)=>{
    const token = localStorage.getItem('UserToken');
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId},
    {headers:{authorization:`Tariq__${token}`}});
    setcount(++count);
    return data;

  }
  const decraseQuantityContext= async(productId)=>{
    const token = localStorage.getItem('UserToken');
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId},
     {headers:{authorization:`Tariq__${token}`}}); 
    setcount(--count);
    return data;
  }


  
  
  return <CartContex.Provider value={{addCartContex,getCartContext,removeCartContext,count,getcountCartContext,setcount,clearCart,incraseQuantityContext,decraseQuantityContext}}>
    {children}
  </CartContex.Provider>;
}

