import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3060/api/register", formData);
      console.log("Registration successful:", response.data);
      alert("Registration successful:", response.data)
   
    } catch (error) {
      console.error("Registration failed:", error.response.data);
     
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>FITNESS</h1>
        
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
