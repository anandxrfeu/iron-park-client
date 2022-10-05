
import React, { useRef } from "react";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import './Home.css'
import {Link} from "react-router-dom"
import { AddressAutofill } from '@mapbox/search-js-react';


function Home(props) {

  const {parkingList,SelectparkingSpotHandler,selectedParkingSpot, coordinates , onSearch} = props

  const url =`/make-reservation/${selectedParkingSpot}`

  const address = useRef()
  const city = useRef()
  const state = useRef()
  const country = useRef()

  const onChangeHandler = () => {
    onSearch( `${address.current.value} ${city.current.value} ${state.current.value} ${country.current.value}`)

  }


  return (

    <MainWrapper>
        <div className="main-left">
          <MapWrapper  parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} coordinates={coordinates}/>
        </div>
        <div className="main-right">
          <div className="form-controls">

            <form className="search-form">

              <div className="search-form__search">
              <h1 className="search-form__header">Search to Park</h1>

                  
              <AddressAutofill className="search-form-autofill" accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
                    
                    <input
                        className="search-form-autofill-address" 
                        name="address" placeholder="Address" type="text"
                        autoComplete="address-line1"
                        ref={address}
                    />
                    
                  </AddressAutofill>

                  <input
                    className="search-form-autofill-city" 
                      name="city" placeholder="City" type="text"
                      autoComplete="address-level2"
                      ref={city}
                  />
                  <input
                      name="state" placeholder="State" type="text"
                      autoComplete="address-level1"
                      ref={state}
                  />
                  <input
                      name="country" placeholder="Country" type="text"
                      autoComplete="country"
                      ref={country}
                      onChange={onChangeHandler}
                  />
                
               </div>


              <div className="search-form__cta">
              <Link to={url}>
                <button className="search-form__btn" type="submit">PARK</button>
                </Link>
              </div>
            </form>

          </div>
          <footer>Built by Anand & Christian</footer>
        </div>
    </MainWrapper>
    
  )
}

export default Home;
