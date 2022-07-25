import { useState, useEffect } from 'react'
import Filter from './Components/filter'
import PersonForm from './Components/personForm'
import Persons from './Components/persons'
import personService from './services/persons'
import Success from './Components/Success'
import Failure from './Components/Failure'

const App = () => {
  const [persons, setPersons] = useState([])
  //const [persons, setPersons] = useState([
  //  { name: 'Arto Hellas', number: '0100100' }
  //]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successfulOperation, setSuccess] = useState('')
  const [failedOperation, setFailure] = useState('')
  const nimetListassa = persons.map(person => person.name)
  const numerotListassa = persons.map(person => person.number)
  
  
  useEffect (() => {
    console.log('effect käynnistynyt')
    console.log('personservice getll', personService.getAll())
    personService.getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
    }, [])
  
    
  const filteredNames = persons.length > 0 ?  
  persons.filter( nimi => 
    nimi.name.toUpperCase().includes(
      newFilter.toUpperCase()
  )) : persons

  const addNameAndNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nimiLuetteloon = {
      name: newName,
      number: newNumber
    }
    console.log('lisättävä nimi', newName)
    
    if (numerotListassa.includes(newNumber)) {
      alert(`Sorry, this number is already on the list`)
    } else if (nimetListassa.includes(newName)){
      const nameToChange = nimiLuetteloon.name
      const personToChange = persons.find(person => person.name === nameToChange)
      const id = personToChange.id
      const changedPerson = {...personToChange, number:newNumber}

      personService.update(id, changedPerson)
        .then(response => {
          console.log('response data updatessa', response.data)
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setSuccess(
            `${newName} was updated successfully`
          )
          setTimeout(() => {
            setSuccess('')
          }, 3000)
        })
        .catch(error => {
          setFailure(
            error.response.data.error
          )
          setTimeout(() => {
            setFailure('')
          }, 6000)
        })
    }else {
      personService.create(nimiLuetteloon)
      .then( response => {
        console.log('create onnistunut', nimiLuetteloon)
      setPersons(persons.concat(nimiLuetteloon))
      setSuccess(
        `${nimiLuetteloon.name} was added successfully`
      )
      setTimeout(() => {
        setSuccess('')
      }, 3000)
      })
      .catch( error => {
        console.log(error.response.data.error)
        console.log('error', error)
        console.log('error res', error.response)
        setFailure(
          error.response.data.error
        )
        setTimeout(() => {
          setFailure('')
        }, 6000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteFromList = (event) => {
    console.log('id', persons.find(person => person.id === event.target.value))
    const personToDelete = persons.find(person => person.id == event.target.value).name
    if (window.confirm(`Delete ${personToDelete} ?`)) {
    personService.deltePerson(event.target.value)
    .then(
        setPersons(persons.concat().filter(person => person.name !== personToDelete))
    ).catch(error => {
      setFailure(
        `Information of ${personToDelete} has already been deleted from the server.`
      )
      setTimeout(() => {
        setFailure('')
      }, 3000)}
    )
    setSuccess(
      `${personToDelete} was deleted successfully`
    )
    setTimeout(() => {
      setSuccess('')
    }, 3000)}
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <PersonForm 
        nameValue={newName} 
        numberValue={newNumber} 
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addNameAndNumber}/>
      <Success message={successfulOperation} />
      <Failure message={failedOperation} />
      <h2>Numbers</h2>
      <Persons people={filteredNames} onClick={deleteFromList} />
    </div>
  )
  

}

export default App