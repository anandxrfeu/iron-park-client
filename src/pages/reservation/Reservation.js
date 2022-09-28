import { useEffect , useContext, useState} from "react"
import { useParams } from "react-router-dom"
import MainWrapper from "../../components/layout/MainWrapper"
import MapWrapper from "../../components/map/MapWrapper"
import apiService from "../../services/api.service"
import { AuthContext } from "../../contexts/authContext"


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
            console.log("reservationData -> ", reservationData)
            setReservation(reservationData)
            setIsloading(false)
        }

        fetchData()

    }, [reservationId])

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
                <div  className="reservation-form__driver-name">
                <label htmlFor="name">Driver Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={reservation.userId.name}
                />
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