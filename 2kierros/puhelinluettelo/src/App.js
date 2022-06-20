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
  console.log('rendered', persons.length, 'people')
    
  const filteredNames = persons.filter( nimi => 
    nimi.name.toUpperCase().includes(
      newFilter.toUpperCase()
  ))

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
      const nameToChange = newName
      const personToChange = persons.find(person => person.name === nameToChange)
      const id = personToChange.id
      const changedPerson = {...personToChange, number:newNumber}

      personService.update(id, changedPerson)
        .then(response => {
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
              `Information of ${nameToChange} has already been deleted from the server. `
            )
          }, 3000)
        
    }else {
    personService.create(nimiLuetteloon)
    .then( newName => 
    setPersons(persons.concat(newName))
    )
    setSuccess(
      `${newName} was added successfully`
    )
    setTimeout(() => {
      setSuccess('')
    }, 3000)
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
    })
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