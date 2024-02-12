import React, { useContext } from 'react'
import UserContex from '../context/User';

export default function Usercontact() {
    let {userData,isLoading} = useContext(UserContex);
    if(isLoading){
        return <p>is loading....</p>;
    }
 
  return (
    <div><h2>{userData.email}</h2></div>
  )
}
