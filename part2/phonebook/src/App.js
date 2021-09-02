import React, { useState } from 'react';
import './App.css';

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

  return (
    <div className="headDiv">
      <h2>Phonebook</h2>
      <div>
        Filter names by <input value={filterValue} onChange={handleFilterChange} />
      </div>
      <h2>Add new Person</h2>
      <form>
        <div className="inputDiv">
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div className="inputDiv">
          Number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.filter((value) => value.name.toLowerCase().includes(filterValue.toLowerCase()))
          .map(person => <p key={person.name}>{person.name} {person.phoneNumber}</p>)
        }
      </div>
    </div>
  )
}

export default App
