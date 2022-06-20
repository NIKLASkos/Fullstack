import { useEffect, useState } from 'react'
import axios from 'axios'

const Capital = ({country}) => {

const api_key = process.env.REACT_APP_API_KEY
const city = country.capital[0]
console.log('kapunki',city)
const [weather, setWeather] = useState([])
useEffect (() => {
    console.log('effect käynnistynyt')
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
    .then( response => {
      console.log('promise fulfilled', response.data)
      setWeather(response.data)
      })
    }, [])
    console.log('rendered', weather)
    
if (weather.main) {
    console.log('sää', weather.main.temp)
    console.log('icon',weather.weather[0].icon)
    return(
        <div>
            {weather.main.temp} degrees Celsius
            <p>Wind: {weather.wind.speed} meters per second</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
        </div>
    )
} else return <div><p>The weather could not be rendered</p></div>


}
export default Capital