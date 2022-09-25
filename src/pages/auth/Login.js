import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { AuthContext } from "../../contexts/authContext";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import './Auth.css'

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
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
      const response = await apiService.login(state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (

    <MainWrapper>
        <div className="main-left">
          <MapWrapper/>
        </div>
        <div className="main-right">
          <div className="form-controls">
            <form onSubmit={handleSubmit} className="auth-form">
              <h1 className="auth-form__header">Login</h1>
              <div className="auth-form__email">
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

              <div className="auth-form__password">
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

              <div className="auth-form__cta">
                <button  className="auth-form__btn" type="submit">Login</button>
              </div>
              
              <Link  className="auth-form__link" to="/auth/signup">
                or, Signup!
              </Link>
              
             </form>
          </div>
          <footer>Built by Anand & Christian</footer>
        </div>
    </MainWrapper>


   
  );
}

export default Login;
