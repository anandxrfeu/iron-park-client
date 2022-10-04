
import { useEffect , useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import ReservationData from "../../components/reservation/ReservationData";
import apiService from "../../services/api.service";
import "./PaymentSuccess.css"

//payment-sucess

const PaymentSuccess = (props) => {
    
    const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props
    const [isLoading, setIsloading] = useState(true) 
    const {reservationId} = useParams()
    const [reservation, setReservation] = useState({})
   
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
    }, [])

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

            {!isLoading && (<div className="payment__confirmation">
                                <h1>Payment Succesfull</h1>
                                <p>Thank you for parking with us!</p>
                            </div>)}

            {!isLoading && <ReservationData reservation={reservation} />}

            <footer>Built by Anand & Christian</footer>
        
        </div>
    </MainWrapper> 
    )
}

export default PaymentSuccess;