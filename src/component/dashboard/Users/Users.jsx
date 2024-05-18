import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import'./Users.css'
import './loader.css'


function Users() {
  const [users,setUsers]=useState([]);
 
  const[loader,setLoader]=useState(true);

  const getUsers =async()=>{
    console.log(loader);
    const {data}=await axios.get(`https://ai-o49a.onrender.com/users/allUsers`,{});
    console.log(data.users);
    setUsers(data.users);
    setLoader(false);
  };
 
  useEffect(()=>{
    getUsers();
 

  },[])

  const RemoveUsers=async(id)=>{
      const token = localStorage.getItem('userToken');
    const {data}=await axios.delete(`https://ai-o49a.onrender.com/users/${id}`,{},{
      headers:{
        Authorization:`Rama__${token}`
      }});
    console.log('mmm');
    getUsers();
     };


  return (
    <>
      {loader==false?
  <div className='usersTabel col'>
    <table className="table table-striped" border={6}>
      <thead>
          <th scope="col" className="text-center">User Name</th>
          <th scope="col" className="text-center">User Email</th>
          
          <th scope="col" className="text-center">Update User</th>
          <th scope="col" className="text-center">Delete User</th>
      </thead>
<tbody>

{users.map(user=> 
  <tr> 

  <td>
   <div className='text-center'><span >{user.userName}</span></div> 
 </td>
 <td>
   <div className='text-center'><span >{user.email}</span></div> 
 </td>
 
 <td>
 <div className='text-center updateUser'>
  <Link to={`/UpdateUser/?name=${user.userName}&id=${user._id}&email=${user.email}&confirmEmail=${user.confirmEmail}&status=${user.status}&role=${user.role}`}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" fill="#86d9f5"/></svg>
  </Link>
  
  
  </div> 
 </td>
 <td>
 <div className='text-center deleteUsers'>
  <button className='btn-light' onClick={()=>RemoveUsers(user._id)}>
   

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="#86d9f5"/></svg>

    
  
  </button>
  
  
  </div> 
 </td>
  </tr>

  )}
</tbody>

      <tfoot >
      <tr >
        <td className='bg-light' colSpan={6}>
          <div className='goToAddUser'>
       
              <Link to='/Login'>    <button className='linkAdd' >Add User</button> </Link>
         
          
            
            </div>
          
          </td>
        
        </tr>
      </tfoot>
    </table>
    
   
  </div>
:
<div className='loading w-100   vh-100 z-3'>
<span className="loader "></span>
</div>
}
    </>
  )
}

export default Users