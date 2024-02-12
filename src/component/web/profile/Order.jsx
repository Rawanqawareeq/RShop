import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function Order() {
  const getorder =async ()=>{
    try{
    const token = localStorage.getItem("UserToken");
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order`,{headers:{Authorization:`Tariq__${token}`}});
    console.log(data);
    return data;
  }catch(error){
    console.log(error);
  }
  }
  const {data,isLoading} = useQuery('orders',getorder);
  if(isLoading){
    return <h2>isloading...</h2>
  }
   
  
  return (
    <div>
  {data?.orders.length? data?.orders.map((order,index)=>
  
  <div key={order._id}>
    <h2>order {index}</h2>
<table border='2' key={order._id} > 
   <tr>
      <th>address</th>
      <th>createdAt</th>
      <th>finalPrice</th>
      <th>paymentType</th>
      <th>phoneNumber</th>
      <th>updatedAt</th>
    </tr>
    <tr>
    <td>{order.address}</td>
    <td>{order.createdAt}</td>
    <td>{order.finalPrice}</td>
    <td>{order.paymentType}</td>
    <td>{order.phoneNumber}</td>
    <td>{order.updatedAt}</td>
    </tr>
    </table>
    </div>
 ):<h2>no catogeries</h2>}
    
    
    </div>
  )
}
