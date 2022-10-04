import { useEffect , useState} from "react"
import { useParams } from "react-router-dom"
import MainWrapper from "../../components/layout/MainWrapper"
import MapWrapper from "../../components/map/MapWrapper"
import apiService from "../../services/api.service"
import ReservationForm from "../../components/reservation/ReservationForm"
import "./Reservation.css"


const Reservation = (props) => {

    const {parkingList,SelectparkingSpotHandler,selectedParkingSpot } = props
    const {reservationId} = useParams()
    const [reservation, setReservation] = useState({})
    const [showExtendReservation, setShowExtendReservation] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const [isLoading, setIsloading] = useState(true) 
    const [refresh, setRefresh] = useState(false)

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
    }, [refresh])


    /** Move functions to utils */
    function padTo2Digits(num) {
        return String(num).padStart(2, '0');
      }
    
    function displayTime (timestamp){
        const time = new Date(timestamp)
        return `${padTo2Digits(time.getHours())}:${padTo2Digits(time.getMinutes())}`
    }

    const onExtendReservation = (event) => {
        event.preventDefault()
        setShowExtendReservation(!showExtendReservation)
    }

    const onSubmitHandler = async (duration) => {
        const payload = {"parkingDuration": Number(duration) + reservation.parkingDuration}
        const updatedReservation = await apiService.extendReservation(reservationId, payload)
        console.log("updated reservation", updatedReservation)
        updatedReservation.checkInTime = displayTime(updatedReservation.createdAt)
        const checkInDate = new Date(updatedReservation.createdAt)
        updatedReservation.checkOutTime = displayTime(checkInDate.getTime() + parseInt(updatedReservation.parkingDuration)*60000)
        setReservation(updatedReservation)
        setRefresh(!refresh)
    }

    const onCheckoutHandler = async () => {
        try{
            const data = await apiService.createCheckOutSession({reservation})
            if(data.url){
                window.location.href = data.url
            }
        }catch(error){
            console.log(error)
        }

        //make payments api call, get client secret and set options state with this info
    }


    return(
        <MainWrapper>

        <div className="main-left">
           <MapWrapper  parkingList={parkingList}  SelectparkingSpotHandler={SelectparkingSpotHandler} selectedParkingSpot={selectedParkingSpot} />
        </div>

        <div className="main-right">
            {isLoading && (<p>Loading...</p>)}

            {!isLoading && !showCheckout && (
            <ReservationForm 
                            reservation={reservation} 
                            showExtendReservation={showExtendReservation}
                            onExtendReservation={onExtendReservation}
                            extendReservation={onSubmitHandler}
                            onCheckoutHandler={onCheckoutHandler}
                            />
            )}
            <footer>Built by Anand & Christian</footer>
            </div>
    </MainWrapper>    
    )

}

export default Reservation