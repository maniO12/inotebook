import React from 'react'
import { useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Signup= () => {

  const [credentials, setCredentials] = useState({name:"",email: "",password: "",cpassword:""}) 
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
      e.preventDefault();
const {name,email,password,cpassword} = credentials;
if (password !== cpassword) {
  alert("Passwords do not match!");
  return;
}
      const response = await fetch('http://localhost:8000/api/auth/createUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      if (json.status){
         localStorage.setItem('token', json.authtoken); 
         navigate("/");
  
}
  }
  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
  <div>
  <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="login-container">
        <h2 className="text-center">Signup</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="text" className="form-label">Name</label>
                    <input type="text" className="form-control"   id="name" name="name" onChange={onChange} placeholder="Enter your Name"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"   id="email" name="email" onChange={onChange} placeholder="Enter email"></input>
                </div>
                <div className="mb-3">
                    <label  htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  name="password" id="password" onChange={onChange} placeholder="Password"></input>
                </div>
                <div className="mb-3">
                    <label  htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  name="cpassword" id="cpassword" onChange={onChange}  placeholder="Password"></input>
                </div>
                <div className="d-grid">
                    <button type="submit" className="newbtn btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  );
}

export default Signup
