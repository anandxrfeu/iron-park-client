import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Signup from '../pages/auth/Signup'
import Login from '../pages/auth/Login'
import Container from "./layout/Container";
import Profile from "../pages/profile/Profile";
import { useState, useEffect } from "react";
import apiService from "../services/api.service";
import CreateReservation from "../pages/reservation/CreateReservation";
import Reservation from "../pages/reservation/Reservation";
import PaymentSuccess from "../pages/payment/PaymentSucess";

import axios from "axios";


function App() {

  const [parkingList, setParkingList] = useState([])
  const [selectedParkingSpot, setSelectedParkingSpot] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // default (Near Ironpark)
   const [coordinates, setCoordinates] = useState({
                longitude: -46.6610803, 
                latitude: -23.5617757,
                zoom: 18
  })   

  // exact (Iron Oark)
  // const [coordinates, setCoordinates] = useState({
  //               longitude: -46.662142, 
  //               latitude: -23.561519,
  //               zoom: 18
  // })

  // test (curitiba)
  // const [coordinates, setCoordinates] = useState({
  //   "latitude":  -25.434701,
  //   "longitude": -49.274954,
  //   zoom: 18
  // })


  useEffect(()=>{

    const fetchData = async () => {

        try{
          const parkingSpots = await apiService.getAllParkingSpots(coordinates.latitude, coordinates.longitude)
          setIsLoading(false)
          setParkingList(parkingSpots)
        }catch(error){
          console.log(error)
        }

    }

    fetchData()

  }, [coordinates])

  const SelectparkingSpotHandler = (event) => {
    setSelectedParkingSpot(event.target.id)

  }

  const onSearch  = async (searchText) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    const res  = await axios.get(url)
    setCoordinates({
      longitude: res.data["features"][0]["center"][0], 
      latitude: res.data["features"][0]["center"][1],
      zoom: 18
    })
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
                                              onSearch={onSearch}
                                              coordinates={coordinates}
                                          />} />
          <Route path="/auth">
            <Route path='signup' element={<Signup 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                              onSearch={onSearch}
                                              coordinates={coordinates}

                                          />} />
            <Route path='login' element={<Login 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                              onSearch={onSearch}
                                              coordinates={coordinates}
                                          />} />
          </Route>
          <Route  path="/user/profile" element={ <Profile 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                              onSearch={onSearch}
                                              coordinates={coordinates}
                                          />} />
          <Route  path="/make-reservation/:parkingSpotId" element={ <CreateReservation 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                              onSearch={onSearch}
                                              coordinates={coordinates}
                                          />} />
          <Route  path="/reservation/:reservationId" element={ <Reservation 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                              onSearch={onSearch}
                                              coordinates={coordinates}
                                          />} />
          {/* <Route  path="/payment" element={ <PaymentBox reservationData={reservationData}/>} /> */}
          <Route  path="/payment-sucess/:reservationId" element={ <PaymentSuccess 
                                              parkingList={parkingList}
                                              SelectparkingSpotHandler={SelectparkingSpotHandler}
                                              selectedParkingSpot={selectedParkingSpot}
                                              onSearch={onSearch}
                                              coordinates={coordinates}
                                          />} />

        </Routes>
      )}
        
    </Container>
  );
}

export default App;
