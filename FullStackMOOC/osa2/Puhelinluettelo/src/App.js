import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'



const Person = (props) => {
  return (
    <div>
      <p>{props.name} {props.number} <button onClick={() => props.HandleNameDelete(props.name, props.id)} > Delete
      </button>
      </p>
    </div>
  )
}
const Filter = (props) => {
  return (
    <div> Filter by name:
      <input value={props.newFilter}
      onChange={props.HandleFilterChange}
      />
    </div>
    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="success">
      {message}
    </div>
  )

}

const Persons = (props) => {
  return(
  <div>
        {props.personsToShow.map(person =>
          <Person key={person.id} id={person.id} name={person.name}
            number={person.number} HandleNameDelete={props.HandleNameDelete}
          />
        )
        } 
    </div>
    )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const HandleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const HandleNameDelete = (name, id) => {
    if (window.confirm('Do you really want to delete this contact')) {
      console.log(id)
      personService.nameDelete(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).then(() => {
        setSuccessMessage(`${name} deleted from phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
      })
      }
  }
  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name
      .toLowerCase()
      .includes(newFilter.toLowerCase()))

  const addNameAndNumber = (event) => {
    event.preventDefault()
    
  const nameObject = {
    name: newName,
    number: newNumber
  }
    // console.log(persons.includes(newName))
    var duplicates = 0
    duplicates = persons.reduce((result, item) => {
      if (nameObject.name === item.name) { 
          result++; 
      }
      return result
    }, 0)
    if (duplicates !== 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        }).then(()=> {
          setSuccessMessage(`${newName} added to phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      }
      // setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
    

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {successMessage}/>
      <Filter newFilter={newFilter} HandleFilterChange= {HandleFilterChange}/>
      <form onSubmit={addNameAndNumber}>
        <div> name:
          <input value={newName}
          onChange={HandleNameChange}
          />
        </div>
        <div> number:
          <input value={newNumber}
          onChange={HandleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} HandleNameDelete={HandleNameDelete} />
    </div>
  )
}
export default App
