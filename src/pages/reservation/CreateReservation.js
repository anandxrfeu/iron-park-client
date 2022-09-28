import MainWrapper from "../../components/layout/MainWrapper"
import MapWrapper from "../../components/map/MapWrapper"
import "./Reservation.css"
import {useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext"
import apiService from "../../services/api.service";


const CreateReservation = (props) => {

  const navigate  = useNavigate()
  const {parkingSpotId} = useParams()
  const authContext = useContext(AuthContext);
  const user = authContext.loggedInUser.user

  const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props

  const [LicensePlate, setLicensePlate] = useState("")
  const [Duration, setDuration] = useState("")
  const [is5Clicked, setIs5Clicked] = useState(false)
  const [is10Clicked, setIs10Clicked] = useState(false)
  const [is15Clicked, setIs15Clicked] = useState(false)

  const setDurationHandler = (event) => {
      const id = event.target.id
      if (id === "option1") {
        setIs5Clicked(true)
        is10Clicked && setIs10Clicked(false)
        is15Clicked && setIs15Clicked(false)
      }
      else if (id === "option2") {
        setIs10Clicked(true)
        is5Clicked && setIs5Clicked(false)
        is15Clicked && setIs15Clicked(false)
  
      }
      else if (id === "option3") {
        setIs15Clicked(true)
        is10Clicked && setIs10Clicked(false)
        is5Clicked && setIs5Clicked(false)
      }
  
      setDuration(event.target.value)
    }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const reservationPayload = {
      licensePlateNumber : LicensePlate,
      parkingDuration : parseInt(Duration),
      parkingSpotId : parkingSpotId,  
    }
    try{
      const reservation = await apiService.createReservation(reservationPayload)
      await apiService.reserveParkingSpot(parkingSpotId, { "reserved": true})
      navigate(`/reservation/${reservation._id}`)
    }catch(err){
      console.log(err)
    }
  }

  return(
      <MainWrapper>
      <div className="main-left">
      <MapWrapper  parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} />
      </div>
      <div className="main-right">
        <div className="form-controls">
          <form className="reservation-form" onSubmit={handleSubmit}> 
              <h1 className="reservation-form__header">Parking Info</h1>
              <div className="reservation-form__license">
                  <label>License</label>
                  <input
                      placeholder = "ABC-1234"
                      type="text"
                      name="license"
                      onChange={(e) => setLicensePlate(e.target.value)}
                      value={LicensePlate}
                  />
              </div>
              <div className="reservation-form__driver-name">
                  <label >Driver</label>
                  <input
                          type="text"
                          name="DriverName"
                          value={user.name}
                          readOnly
                  />
              </div>
              <div className="reservation-form__duration">
                  <label className="reservation-form-duration-label">Duration <br/> (mins)</label>
                  <div className="radio">
                          <label className={is5Clicked ?  "reservation-form-duration-btn reservation-form-duration-btn__clicked" : "reservation-form-duration-btn "} htmlFor="option1" >
                          <input
                              type="radio"
                              className="btn-check"
                              value="5"
                              id="option1"
                              autoComplete="off"
                              name="Duration Radio Buttons"
                              onChange={setDurationHandler}
                          />05</label>

                          <label  className={is10Clicked ?  "reservation-form-duration-btn reservation-form-duration-btn__clicked" : "reservation-form-duration-btn"} htmlFor="option2"  >
                          <input
                              type="radio"
                              className="btn-check"
                              value="10"
                              id="option2"
                              autoComplete="off"
                              name="Duration Radio Buttons"
                              onChange={setDurationHandler}
                          />10</label>
                      
                          <label  className={is15Clicked ?  "reservation-form-duration-btn reservation-form-duration-btn__clicked" : "reservation-form-duration-btn "}  htmlFor="option3" >
                          <input
                              type="radio"
                              value="15"
                              className="btn-check"
                              id="option3"
                              autoComplete="off"
                              name="Duration Radio Buttons"
                              onChange={setDurationHandler}
                          />15</label>
                  </div>
              </div>
              <button className='reservation-form__btn' type="submit">Confirm</button>
            </form>
        </div>
        <footer>Built by Anand & Christian</footer>
      </div>
  </MainWrapper>
  )
}

export default CreateReservation