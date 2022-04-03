import React, { Fragment } from 'react'
import axios from 'axios'
import classes from './Search.module.css'
import searchIcon from '../../images/search-blue.png'
import { PlaceCard } from '../PlaceCard'

const Search = ({ setCoordinates, apiKey }) => {
  // Set up the user input
  const [searchCity, setSearchCity] = React.useState('')
  const [placeData, setPlaceData] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [showCard, setShowCard] = React.useState(false)

  const handlePlaceItem = () => {
    setShowCard(!showCard)
  }

  // Get coordinates from Mapbox API
  async function getCoordinates () {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchCity}.json?limit=2&access_token=${apiKey}`
      )
      const placeData = data.features
      setPlaceData(placeData)
      console.log(placeData)
      // Set longitude to pass to the parent through props
      const long = data.features[0].geometry.coordinates[0]
      // Set latitude to pass to the parent through props
      const lat = data.features[0].geometry.coordinates[1]
      setCoordinates(long, lat)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getCoordinates()
  }, [])

  const handleOnChange = ({ target }) => {
    setSearchCity(target.value.toLowerCase())
    setShowCard(false)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handlePlaceItem()
      getCoordinates()
    }
    // if(event.key !== 'Enter') {
    //   handlePlaceItem();
    // }
  }

  const handleClickIcon = () => {
    handlePlaceItem()
    getCoordinates()
  }

  return (
    <Fragment>
      {!loading && (
        <div className={classes.search}>
          <div className={classes.wrapper}>
            <input
              type='text'
              value={searchCity}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              placeholder="Try 'London', 'Berlin'... "
            />
            <button className={classes.icon} onClick={handleClickIcon}>
              <img src={searchIcon} alt='search' />
            </button>
            <div>
              <div className={classes.places}>
                {placeData?.map(item => (
                  <PlaceCard
                    key={item?.id}
                    data={item}
                    show={showCard}
                  ></PlaceCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Search
