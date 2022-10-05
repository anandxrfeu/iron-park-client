import { useEffect, useState } from 'react';
import Map, {Marker} from 'react-map-gl';
import pin from "../../assets/images/pin.png"
import "./MapWrapper.css"

const MapWrapper = (props) => {

  const {parkingList, SelectparkingSpotHandler, selectedParkingSpot, coordinates} = props
  const [initialState, setInitialState] = useState(coordinates)

  useEffect( () => {
    if(JSON.stringify(coordinates) !== JSON.stringify(initialState)){
        setInitialState(coordinates)
      }
  } , [coordinates, initialState])


  return <Map
            //   initialViewState={{
            //     longitude: -46.6610803, 
            //     latitude: -23.5617757,
            //     zoom: 18
            //   }}
              initialViewState={initialState}
              className="map-box"
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >

{parkingList.length !== 0 && parkingList.map( parkingSpot => {
                            let selectedButtonClass= ''
                            if(parkingSpot._id === selectedParkingSpot){
                                selectedButtonClass = 'btnFocus'

                            }

                            return (
                                <Marker key={parkingSpot._id} 
                                        latitude={parkingSpot.coordinates.latitude} 
                                        longitude={parkingSpot.coordinates.longitude} 
                                        anchor="bottom" >
                                    <button 
                                            className={parkingSpot.reserved ? 'btnPinReserved' : `btnPinFree ${selectedButtonClass}`}>
                                        <img 
                                            src={pin} 
                                            id={parkingSpot._id} 
                                            onClick={SelectparkingSpotHandler} 
                                            style={{height: '40px', width: '40px'}} 
                                            className={parkingSpot.reserved ? 'pinRed' : `pinGreen ${selectedButtonClass} `}
                                            alt='pin'/>
                                    </button>
                                </Marker>  
                            )
                        } )}
          </Map>

}

export default MapWrapper;