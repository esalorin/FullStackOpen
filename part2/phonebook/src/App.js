import { useState,  useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    numberService
	  .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addNew = (event) =>  {
    const trimName = newName.trim()
    const trimNumber = newNumber.trim()
    event.preventDefault()
    if (persons.find(p => p.name === trimName)) {
      if (window.confirm(`${trimName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === trimName)
        const changedNumber = { ...person, number: trimNumber }
        
        numberService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
      }
    }
    else {
      const newPerson = {name: trimName, number: trimNumber}
      numberService
      .create(newPerson)
      .then(returnedPerson=> {
        setPersons(persons.concat(returnedPerson))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      numberService
      .remove(person.id)
      .then(()=> {
        setPersons(persons.filter(p=>p.id!==person.id))
      })
    }
  }

  const inputName = (event) => setNewName(event.target.value)
  const inputNumber = (event) => setNewNumber(event.target.value)
  const addFilter = (event) => setFilter(event.target.value)

  const filterPersons = filter ? persons.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase())):persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={addFilter}/>
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} changeName={inputName} changeNumber={inputNumber} onClick={addNew}/>
      <h2>Numbers</h2>
      <div>
        {filterPersons.map(person =>
        <Persons key={person.id} name={person.name} number={person.number} deletePerson={()=> deletePerson(person)}/>
        )
        }
      </div>
    </div>
  )
}

export default App