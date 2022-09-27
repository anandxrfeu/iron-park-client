import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import { AuthContext } from "../../contexts/authContext";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import './Auth.css'

function Login(props) {
  const authContext = useContext(AuthContext);
  const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props

  const email = useRef();
  const password = useRef()

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    
    const payload = {
      email: email.current.value,
      password: password.current.value
    }

    try {
      const response = await apiService.login(payload);
      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (

    <MainWrapper>
        <div className="main-left">
        <MapWrapper  parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} />
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
                  ref={email}
                />
              </div>

              <div className="auth-form__password">
                <label htmlFor="signupFormPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  id="signupFormPassword"
                  ref={password}
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
