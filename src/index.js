import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthContextComponent } from "./contexts/authContext";
import {BrowserRouter} from 'react-router-dom'
import "./assets/styles/index.css"

ReactDOM.render(
  <AuthContextComponent>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </AuthContextComponent>,
  document.getElementById("root")
 );
