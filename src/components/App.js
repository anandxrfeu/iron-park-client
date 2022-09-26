import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Container from "./layout/Container";
import Profile from "../pages/profile/Profile";


function App() {
  return (
    <Container>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route path="/auth">
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>
          <Route exact path="/user/profile" element={ <Profile />} />
        </Routes>
    </Container>
  );
}

export default App;
