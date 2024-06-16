import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
const  navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials + " in UI");
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if (json.status){
           localStorage.setItem('token', json.authtoken); 
           navigate("/");    
    }
    else{
        alert("Invalid credentials");
    }
     console.log(json); 
    }  
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
          <h4 className="text-center text-light">Login or signup to add your Notes</h4>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="login-container">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  value={credentials.email} onChange={onChange} id="email" name="email"  placeholder="Enter email"></input>
                </div>
                <div className="mb-3">
                    <label  htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  value={credentials.password} onChange={onChange} name="password" id="password" placeholder="Password"></input>
                </div>
                <div className="d-grid">
                    <button type="submit" className="newbtn btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login
