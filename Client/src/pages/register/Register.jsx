import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config";

// import React from "react";
function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const res = await axiosInstance.post("/auth/register", newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="form-container 40-w p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Register</h3>
          <div className="mb-2">
            <label htmlFor="lname">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              // value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              // value={email}
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Register</button>
          </div>
          <p className="text-end mt-2">
            Already Register
            <Link to="/login" className="ms-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
