import React, { useContext } from 'react'
import UserContex from '../context/User';

export default function Userinfo() {
    let {userData,isLoading,setIsLoading} = useContext(UserContex);
    if(isLoading){
        return <p>is loading....</p>;
    }
    
  return (
    <div>
    <h2>{userData.userName}</h2>
    <img  src={userData.image.secure_url}/>
    </div>
  )
}
