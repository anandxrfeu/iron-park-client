import { useState } from "react"
import "./ReservationForm.css"

const ReservationForm = (props) => {

    const {reservation, showExtendReservation, onExtendReservation, extendReservation, onCheckoutHandler} = props
    const [duration, setDuration] = useState("")

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
        //console.log(event.target.value)
        setDuration(event.target.value)
      }

    

    return (
        <div className="form-controls">
        <form className="reservation-form" onSubmit={(e) => {e.preventDefault(); extendReservation(duration)}}>
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

            {showExtendReservation && (
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
            )}

            {!showExtendReservation && (
            <div className="reservation-form__btns">
                <button className="reservation-form__btn" type="button" onClick={(e) => onExtendReservation(e)}>Extend</button>
                <button className="reservation-form__btn" type="button" onClick={onCheckoutHandler}>Checkout</button>
            </div>
            )}

            {showExtendReservation && (
            <div className="reservation-form__btns">
                <button className='reservation-form__btn' type="submit">Confirm</button>
                <button className="reservation-form__btn" type="button" onClick={onCheckoutHandler}>Checkout</button>
            </div>

            )}

        </form>
      </div>
    )

}

export default ReservationForm