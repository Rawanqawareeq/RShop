import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export default function Pagination() {
    let [product,setproduct] = useState([]);
    let [page,setPage] = useState(1);
    let [limit,setlimit] = useState(2);
    let[loading,setLoading] = useState(true);
    const getPage=async(index)=>{
      await setPage(index);
      setLoading(true);
      await getPagination();

    }
    const getPagination =  async()=>{
       try{
        
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=2`);
        setproduct(data);
        console.log(product);
        setLoading(false);
        return data;
       }catch(error){}
    }
   
   
    useEffect(()=>{
      getPagination(); 
    },[page]);
    if(loading){
      return<h2>loading...</h2>
    }

  return (
   <div className='container'>
    <div className='row' >
    {loading == false ?product.products.map((product)=>
     <div className='col-md-6' key={product._id} >
      <img src={product.mainImage.secure_url} width='250px' height='350px' />
        <h2  >{product.name}</h2>
        <Link to={`/products/${product._id}`}>Details</Link>
     </div>
   ):<h2>no product</h2>}
    </div>
    
  <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <button className="page-link" onClick={()=>{getPage(--page)}} aria-label="Previous" disabled={page==1}>
        <span aria-hidden="true">«</span>
      </button>
    </li>
    {Array.from({length : product?.total/product?.page}).map((product,index)=>      
    <li className="page-item" key={index}><button className="page-link" onClick={()=>{getPage(index+1);} }>
      {index+1}</button></li>
)}
    <li className="page-item">
      <button className="page-link" onClick={()=>{getPage(++page);}} aria-label="Next" disabled={page== product?.total/product?.page}>
        <span aria-hidden="true">»</span>
      </button>
    </li>
  </ul>
</nav>




   </div>

  )
}
