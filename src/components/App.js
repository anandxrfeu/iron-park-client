import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Container from "./layout/Container";
import Profile from "../pages/profile/Profile";
import { useState, useEffect } from "react";
import apiService from "../services/api.service";


function App() {

  const [parkingList, setParkingList] = useState([])
  const [selectedParkingSpot, setSelectedParkingSpot] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{

    const fetchData = async () => {
        try{
          const parkingSpots = await apiService.getAllParkingSpotsForArea()
          setIsLoading(false)
          setParkingList(parkingSpots)
        }catch(error){
          console.log(error)
        }

    }

    fetchData()

  }, [])

  const SelectparkingSpotHandler = (event) => {
    setSelectedParkingSpot(event.target.id)

  }


  return (
    <Container>
      {isLoading && (
        <p>Loading...</p>
      )}
      {!isLoading && (
        <Routes>
          <Route exact path="/" element={ <Home 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                          />} />
          <Route path="/auth">
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
          </Route>
          <Route exact path="/user/profile" element={ <Profile />} />
        </Routes>
      )}
        
    </Container>
  );
}

export default App;
