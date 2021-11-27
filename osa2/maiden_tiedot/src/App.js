import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = ({ name, buttonOnClick }) => (
  <div>
    {name} <button onClick={() => buttonOnClick(name)}>show</button>
  </div>
)

const OneContryInfo = ({ data }) => {

  const [ weatherData, setWeatherData ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
  const capital = data.capital
  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        /* console.log(response.data.current) */
        setWeatherData(response.data.current)
        setIsLoading(false)
    })
  }, [])
  
  return (
    <div>
      <h1>{data.name.common}</h1>
      <p>capital {data.capital}</p>
      <p>population {data.population}</p>
      <h3>languages</h3>
      <ul>
        { Object.values(data.languages).map( (lang, i) => (
          <li key={i}>{lang}</li>
        )) }
      </ul>
      <img alt="Flag" src={data.flags.png} />
      <Weather capital={data.capital} weatherData={weatherData} isLoading={isLoading} />
    </div>
  )
}

const Weather = ({ capital, weatherData, isLoading }) => {
  if (isLoading) {
    return <></>
  }
  return (<div>
    <h3>Weather in {capital}</h3>
    <p>temperature: {weatherData.temperature}</p>
    {
      weatherData.weather_icons.map( (icon, i) => (
        <img alt="Weather icon" src={icon} key={i}/>
      ))
    }
    <p>Description: {weatherData.weather_descriptions.join(" ")}</p>
    <p>wind: {weatherData.wind_speed} direction {weatherData.wind_dir}</p>
  </div>)
}

const CountryList = ({ data, filterValue, buttonOnClick }) => {
  const newData = data.filter( country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()) )
  /* console.log(newData, filterValue) */
  if (newData.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (newData.length === 1) {
    return <OneContryInfo data={newData[0]} />
  }
  /* console.log(newData) */
  return (
    newData.map( (country, i) => (
      <Country key={i} name={country.name.common} buttonOnClick={buttonOnClick} />
    ))
  )
}

const App = () => {
  const [ countryData, setCountryData ] = useState([])
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        /* console.log("promise fulfilled")
        console.log(response.data) */
        setCountryData(response.data)
    })
  }, [])

  const onFilterValueChange = (event) => setFilterValue(event.target.value)

  const showButtonOnClick = (name) => {
    setFilterValue(name)
  }


  return (
    <div>
      <div>
        Find countries <input value={filterValue} onChange={onFilterValueChange} />
      </div>
      <CountryList data={countryData} filterValue={filterValue} buttonOnClick={showButtonOnClick} />
      {/* { countryData.map( (country, i) => (
        <Country key={i} name={country.name.common}/>
      )) } */}
    </div>
  )

}

export default App
