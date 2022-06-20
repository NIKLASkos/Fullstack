import { useState, useEffect } from 'react'

import axios from 'axios'
import Countrieslist from './components/Countrieslist'
import Filter from './components/filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const valtiotListassa = countries.map(country => country.name.common)
  console.log('filter', newFilter)
  console.log('valtiot',valtiotListassa)
  

  useEffect (() => {
    console.log('effect käynnistynyt')
    axios
    .get('http://localhost:3001/countries')
    .then( response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      })
    }, [])
    console.log('rendered', countries.length, 'maata')

  const filteredCountries = countries.filter( nimi => 
    nimi.name.common.toUpperCase().includes(
      newFilter.toUpperCase()
      ))
      console.log('filtteroidut maat',filteredCountries)


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Find countries</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countrieslist countries={filteredCountries} onClick={handleFilterChange} />
      
    </div>
  )

}

export default App