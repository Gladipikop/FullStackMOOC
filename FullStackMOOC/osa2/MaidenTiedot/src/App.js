import React, { useState, useEffect } from 'react'
import axios from 'axios'




const Filter = (props) => {
  return (
    <div> Find countries:
      <input value={props.newFilter}
      onChange={props.HandleFilterChange}
      />
    </div>
    )
}
const Country = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}
const ShowDetailedCountry = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>Capital {props.country.capital}</p>
      <p>Population {props.country.population}</p>
      <h2>Languages</h2>
      <Languages languages={props.country.languages} />
      <img src={props.country.flags.png}/>
    </div>
  )
}

const Languages = (props) => {
  return (
    <ul>
      {Object.keys(props.languages).map(language => <li key={props.languages[language]}>{props.languages[language]}</li>)}
    </ul>
  )
}
const Countries = (props) => {
  console.log(props.countriesToShow.length)
  if (props.filter === '') {
    return (
      <div>
        <p>Start writing to filter countries</p>
      </div>
    )
  } else if (props.countriesToShow.length > 10) {
    return(
    <div>
      <p>
        Too many matches, specify another filter
      </p>
      </div>
    )
  } else if (props.countriesToShow.length === 1) {
    return (
      <ShowDetailedCountry country={props.countriesToShow[0]} />
    )
  } else if (props.countriesToShow.length > 0 && props.countriesToShow.length <= 10) {
    return(
    <div>
      {props.countriesToShow.map(country =>
        <Country key={country.name.common} name={country.name.common}
        />
      )}
      </div>
    )
  }
  return (
    <>
    </>
  )
}

const App = () => {
//   const [ persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newCountries, setNewCountries] = useState([])

  useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setNewCountries(response.data)
    })
  }, [])

  const HandleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter === ''
    ? newCountries
    : newCountries.filter(country => country.name.common
      .toLowerCase()
      .includes(newFilter.toLowerCase()))
  
  // var nameCount = 0
  //   duplicates = persons.reduce((result, item) => {
  //     result++;
  //     console.log(item.name);
  //     return result
  //   }, 0)
  //   if (duplicates !== 0) {
  //     window.alert(`${newName} is already added to phonebook`)
  //   } else {
  //     setPersons(persons.concat(nameObject))
  // }
  
  return (
    <div>
      <Filter newFilter={newFilter} HandleFilterChange={HandleFilterChange} />
      <Countries countriesToShow={countriesToShow} filter={newFilter} />
    </div>
  )
}
export default App
