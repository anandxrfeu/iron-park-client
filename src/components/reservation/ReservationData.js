import "./ReservationData.css"


const ReservationData = (props) => {

    const {reservation} = props

    return(
        <div className="form-controls">
            <form className="reservation-data" >
            <h3 className="reservation-data__header">Reservation Details</h3>
            <div  className="reservation-data__field">
                <label htmlFor="name">Driver Name</label>
                <label htmlFor="name">{reservation.userId.name}</label>
            </div>
            
            <div  className="reservation-data__field">
                <label htmlFor="name">License #</label>
                <label htmlFor="name">{reservation.licensePlateNumber}</label>
            </div>

            <div  className="reservation-data__field">
                <label htmlFor="name">Check In</label>
                <label htmlFor="name">{reservation.checkInTime}</label>
            </div>

            <div  className="reservation-data__field">
                <label htmlFor="name">Check Out</label>
                <label htmlFor="name">{reservation.checkOutTime}</label>
            </div>
        </form>
    </div>
    )   

}


export default ReservationData