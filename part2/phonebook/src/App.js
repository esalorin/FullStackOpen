import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: 123456789 }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNew = (event) =>  {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(newName+" is already added to phonebook")
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={filterPersons} />
    </div>
  )
}

export default App