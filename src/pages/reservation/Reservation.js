import { useEffect , useContext, useState} from "react"
import { useParams } from "react-router-dom"
import MainWrapper from "../../components/layout/MainWrapper"
import MapWrapper from "../../components/map/MapWrapper"
import apiService from "../../services/api.service"
import "./Reservation.css"


const Reservation = (props) => {

    const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props
    const {reservationId} = useParams()
    const [reservation, setReservation] = useState({})
    const [isLoading, setIsloading] = useState(true) 
    // const authContext = useContext(AuthContext);
    // const user = authContext.loggedInUser.user

    useEffect(()=>{
        
        const fetchData = async () =>{
            const reservationData = await apiService.getReservationInfo(reservationId)
            reservationData.checkInTime = displayTime(reservationData.createdAt)
            const checkInDate = new Date(reservationData.createdAt)
            reservationData.checkOutTime = displayTime(checkInDate.getTime() + parseInt(reservationData.parkingDuration)*60000)
            setReservation(reservationData)
            setIsloading(false)
        }

        fetchData()

    }, [reservationId])


    /** Move functions to utils */
    function padTo2Digits(num) {
        return String(num).padStart(2, '0');
      }
    
    function displayTime (timestamp){
        const time = new Date(timestamp)
        return `${padTo2Digits(time.getHours())}:${padTo2Digits(time.getMinutes())}`
    }

    return(
        <MainWrapper>

        <div className="main-left">
           <MapWrapper  parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} />
        </div>
        <div className="main-right">
        {isLoading && (<p>Loading...</p>)}

        {!isLoading && (
            <div className="form-controls">
            <form className="reservation-form">
                <h1 className="reservation-form__header">Reservation</h1>
                <div  className="reservation-form__field">
                    <label htmlFor="name">Driver Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={reservation.userId.name}
                        readOnly

                    />
                </div>
                
                <div  className="reservation-form__field">
                    <label htmlFor="name">License #</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={reservation.licensePlateNumber}
                        readOnly

                    />
                </div>

                <div  className="reservation-form__field">
                    <label htmlFor="name">Check In</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={reservation.checkInTime}
                        readOnly
                    />
                </div>

                <div  className="reservation-form__field">
                    <label htmlFor="name">Check Out</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={reservation.checkOutTime}
                        readOnly

                    />
                </div>

                <div className="reservation-form__btns">
                    <button className="reservation-form__btn" type="button">Extend</button>
                    <button className="reservation-form__btn" type="button">Checkout</button>
                </div>

            </form>
          </div>
        )}
          
          <footer>Built by Anand & Christian</footer>
        </div>
    </MainWrapper>    
    )

}

export default Reservation