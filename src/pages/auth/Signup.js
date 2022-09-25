import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";

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

    <MainWrapper>

        <div className="main-left"><MapWrapper /></div>
        <div className="main-right">
          <div className="form-controls">
          <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-form__header">Create an account</h1>
            <div  className="auth-form__email">
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

            <div  className="auth-form__email">
              <label htmlFor="signupFormEmail">Email</label>
              <input
                type="email"
                name="email"
                id="signupFormEmail"
                value={state.email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>

            <div  className="auth-form__password">
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
                <button className="auth-form__btn" type="submit">Signup</button>
              </div>

              <Link className="auth-form__link" to="/auth/login">
                or, Login
              </Link>
          </form>
          </div>
          <footer>Built by Anand & Christian</footer>
        </div>
    </MainWrapper>    
  );
}

export default Signup;
