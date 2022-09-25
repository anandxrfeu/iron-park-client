import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await apiService.signUp(state);
      setErrors({ name: "", password: "", email: "" });
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (

    <div className="main-container">
      <div className="main-wrapper">
        <div className="main-left">Map</div>
        <div className="main-right">
          <div className="form-controls">
          <form onSubmit={handleSubmit}>
            <h1>Signup!</h1>
            <div>
              <label htmlFor="signupFormName">Name</label>
              <input
                type="text"
                name="name"
                id="signupFormName"
                value={state.name}
                error={errors.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="signupFormEmail">E-mail Address</label>
              <input
                type="email"
                name="email"
                id="signupFormEmail"
                value={state.email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="signupFormPassword">Password</label>
              <input
                type="password"
                name="password"
                id="signupFormPassword"
                value={state.password}
                error={errors.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <button type="submit">Signup!</button>

              <Link to="/auth/login">
                Already have an account? Click here to login.
              </Link>
            </div>
          </form>
          </div>
          <footer>Built by Anand & Christian</footer>
        </div>
      </div>
    </div>



    
  );
}

export default Signup;
