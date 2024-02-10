import axios from "axios";
import { createContext, useState } from "react";
import React from 'react'
import { toast } from "react-toastify";


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
                 return data;
     
    }catch(error){
        
    }
  }
  const getcountCartContext=async ()=>{
    try{
         const token = localStorage.getItem("UserToken");
         const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
         {headers:{Authorization:`Tariq__${token}`}});
         setcount(data.count);
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
       
    }
  }
  const clearCart= async()=>{
   try{
    const token = localStorage.getItem('UserToken');
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
    {headers:{authorization:`Tariq__${token}`}});
    return data;
   }catch(error){}
   
  }
  return <CartContex.Provider value={{ addCartContex,getCartContext,removeCartContext,count,getcountCartContext,setcount}}>
    {children}
  </CartContex.Provider>;
}

