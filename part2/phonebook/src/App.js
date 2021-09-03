import React, { useEffect, useState } from 'react';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import AllPersonsDisplay from './components/AllPersonsDisplay';

import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => setPersons(response))
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personToAdd = {
      name: newName,
      phoneNumber: newPhoneNumber,
    }
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      phonebookService
        .create(personToAdd)
        .then(() => {
          setPersons(persons.concat(personToAdd));
          setNewName('');
          setNewPhoneNumber('');
        });
    }
    else {
      if (window.confirm(`${newName} is already in your phonebook, replace the old number with the new one?`)) {
        phonebookService
          .replaceNumber(persons.map(person => person.name).indexOf(newName) + 1, personToAdd);
          /* couldn't figure out how to do the spread properly with objects...
           * so here's a hacky functional sausage that kind of works?
           * the only issue is that it messes up the order (only in the app, the db maintains order) */
        setPersons(persons.filter(person => person.name !== newName).concat(personToAdd));
        setNewName('');
        setNewPhoneNumber('');
      }
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

  /* generates an object which pairs names with removal functions
   * couldn't use id's since they are stored only in the server, not in the React app
   * it is kind of buggy because if the numbering gets messed up, the loop no longer works properly */
  const generateOnClickFunctions = () => {
    let onClicks = {};
    for (let i = 0; i < persons.length; i++) {
      onClicks[persons[i].name] = () => {
        if (window.confirm(`Do you really want to delete ${persons[i].name}'s number?`)) {
          setPersons(persons.filter(person => person.name !== persons[i].name));
          phonebookService.deletePerson(i + 1);
        }
      }
    }
    return onClicks;
  }

  const onClicks = generateOnClickFunctions();

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
      <AllPersonsDisplay persons={persons} filterValue={filterValue} onClicks={onClicks} />
    </div>
  )
}

export default App
