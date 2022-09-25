import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapWrapper.css'
const MapWrapper = (props) => {

    const Map = ReactMapboxGl({
        accessToken:
          process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      });

    return(
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100%',
              width: '100%',
              zoom: 1,
            }}
            className="map-box"
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[-23.5617757,  -46.6610803]} />
            </Layer>
        </Map>
    )

}

export default MapWrapper;