import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import AllPersonsDisplay from './components/AllPersonsDisplay';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5600/persons") //different port for personal reasons
      .then(response => setPersons(response.data))
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      const personToAdd = {
        name: newName,
        phoneNumber: newPhoneNumber,
      }
      setPersons(persons.concat(personToAdd));
      setNewName('');
      setNewPhoneNumber('');
    }
    else {
      window.alert(`${newName} is already in your phonebook!`);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  }

  // a lot of repetitive state-passing code; there has to be a better way...
  return (
    <div className="headDiv">
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>Add new Person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
                  newPhoneNumber={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange} 
                  addPerson={addPerson} />
      <h2>Numbers</h2>
      <AllPersonsDisplay persons={persons} filterValue={filterValue}/>
    </div>
  )
}

export default App
