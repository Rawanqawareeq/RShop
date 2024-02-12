import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import UserContex  from '../context/User';
import { CartContex } from '../context/Cart';
export default function Navbar() {
  let {UserToken,setUserToken,userData} = useContext(UserContex);
  let{count} = useContext(CartContex);
 
  let navigate = useNavigate();
  const logout = ()=>{
  
    localStorage.removeItem("UserToken");

    setUserToken(null);
    navigate('/');
    
  }
  return (
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"  >Categories</Link>
        </li>  
        <li className="nav-item">
          <a className="nav-link" href="#">Product</a>
        </li>  
        {UserToken? <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart <span className="badge text-bg-secondary">{count}</span></Link>
        </li>:null }
      </ul>

      <ul className='navbar-nav me-auto'>
     <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {userData?userData.userName:'Account'}
          </a>
          <ul className="dropdown-menu">
           {UserToken==null? <>
              <li><Link className="dropdown-item"  to='/register' >Register</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to='/login'>login</Link></li>
            </>:
            <>
             <li><Link className="dropdown-item"  to='/profile' >Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>

            </>}
            
          </ul>
        </li>
     </ul>
     
     
    </div>
  </div>
</nav>

  )
}
