import React, { useState } from 'react';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import AllPersonsDisplay from './components/AllPersonsDisplay';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phoneNumber: '040-1234567'
    },
    {
      name: 'Seco Vlad',
      phoneNumber: '070-7398087'
    },
    {
      name: 'Ada Lovelace',
      phoneNumber: '39-44-5323523'
    },
    {
      name: 'Dan Abramov',
      phoneNumber: '12-43-234345'
    },
    {
      name: 'Mary Poppendieck',
      phoneNumber: '39-23-6423122'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

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
