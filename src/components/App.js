import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Container from "./layout/Container";


function App() {
  return (
    <Container>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route path="/auth">
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
    </Container>
  );
}

export default App;
