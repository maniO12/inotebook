import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
const Navbar = ()=>{
const navigate = useNavigate();
const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate("/Login")
}

  return( 

      <div>
        <nav className="navbar navbar-expand-lg  bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand text-light" >MyNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-3 mb-lg-0">
        <li className="nav-item "><Link className="nav-link text-light" to="/"> Home</Link></li>
        <li className="nav-item "><Link className="nav-link text-light" to="/about">About</Link></li>
      </ul>

      {!localStorage.getItem('token')? <div className="d-flex">
      <Link className="btn btn-primary me-2" to="/Login">Login</Link>
            <Link className="btn btn-primary" to="/Signup">Signup</Link>
          </div>:<button onClick={handleLogout} className="btn btn-primary">Logout</button> }
    </div>
  </div>
</nav>
      </div>
    )
  }


export default Navbar



