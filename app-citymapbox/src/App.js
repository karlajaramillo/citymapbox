import './App.css'
import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import {Spinner} from './Components/UI/Spinner'
import { Search } from './Components/Search'

function App () {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2F2YWphZ2EiLCJhIjoiY2x5Mm5sODZjMHl1aTJqcXhrZGQ3d2I4bCJ9.zK0l6L8hgp0FLwVRi9ysEQ'

  const mapContainer = React.useRef(null)
  const map = React.useRef(null)
  const [long, setLong] = React.useState(-3.693621238669246)
  const [lat, setLat] = React.useState(40.41826893105479)
  const [zoom, setZoom] = React.useState(14)
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function getMap () {
    try {
      //if (map.current) return // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [long, lat],
        zoom: zoom
      })

    } catch (err) {
      setError(err);

    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    //if(map.current) return
    console.log({ lat })
    console.log({ long })
    getMap();
  }, [long, lat])

  React.useEffect(() => {
    // wait for map to initialize
    // if (!map.current) return
    // map.current.on('move', () => {
    //   setLong(map.current?.getCenter().long)
    //   setLat(map.current?.getCenter().lat.toFixed(4))
    //   setZoom(map.current?.getZoom().toFixed(2))
    // })
  })

  const setSearchCoordinates = (newLong, newLat) => {
    setLong(newLong);
    setLat(newLat);

  }
  return (
    <div className='App'>
    {loading && <Spinner/>}
      {mapContainer && (
        <div>
          <h1 className='title'>City Finder</h1>
          <Search
            setCoordinates={setSearchCoordinates}
            apiKey={mapboxgl.accessToken}
          ></Search>
          <div className='map-container'>
            <div ref={mapContainer} className='map-container' />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
