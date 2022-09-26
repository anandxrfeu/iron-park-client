import React, {useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";

function Signup(props) {
  const name = useRef()
  const email = useRef();
  const password = useRef()

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    }
    try {
      await apiService.signUp(payload);
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
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
                ref={name}
              />
            </div>

            <div  className="auth-form__email">
              <label htmlFor="signupFormEmail">Email</label>
              <input
                type="email"
                name="email"
                id="signupFormEmail"
                ref={email}
              />
            </div>

            <div  className="auth-form__password">
              <label htmlFor="signupFormPassword">Password</label>
              <input
                type="password"
                name="password"
                id="signupFormPassword"
                ref={password}
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
