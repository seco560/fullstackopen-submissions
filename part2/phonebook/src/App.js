import React, { useEffect, useState } from 'react';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import AllPersonsDisplay from './components/AllPersonsDisplay';
import Notification from './components/Notification';

import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState('');
  const [isSuccessNotification, setSuccessNotification] = useState(true);

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => setPersons(response))
  }, []);

  const timeoutAndClearNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  // prevent some annoying repetition
  const createNotification = (message, isSuccess, addingNumber) => {
    setSuccessNotification(isSuccess);
    setNotification(message);
    if(addingNumber) { // to prevent unexpected deletions of input data
      setNewName('');
      setNewPhoneNumber('');
    }
    timeoutAndClearNotification();
  }

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
          createNotification(`${newName} has been added to your phonebook!`, true, true);
        });
    }
    else {
      if (window.confirm(`${newName} is already in your phonebook, replace the old number with the new one?`)) {
        phonebookService
          .replaceNumber(persons.map(person => person.name).indexOf(newName) + 1, personToAdd)
          .catch((err) => {
            createNotification(`${newName}'s number has already been removed from the server during a different operation.`, false, false);
          })
        /* couldn't figure out how to do the spread properly with objects...
         * so here's a hacky functional sausage that kind of works?
         * the only issue is that it messes up the order (only in the app, the "db" maintains order) */
        setPersons(persons.filter(person => person.name !== newName).concat(personToAdd));
        createNotification(`${newName}'s number' has been successfully updated.`, true, true);
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
   * it is kind of buggy because if the numbering gets messed up, the loop no longer works properly 
   * and it does get messed up whenever you delete a contact. current solution is just manually editing id's */
  const generateOnClickFunctions = () => {
    let onClicks = {};
    for (let i = 0; i < persons.length; i++) {
      onClicks[persons[i].name] = () => {
        if (window.confirm(`Do you really want to delete ${persons[i].name}'s number?`)) {
          setPersons(persons.filter(person => person.name !== persons[i].name));
          phonebookService.deletePerson(i + 1).catch(error => {
            createNotification(`${persons[i].name}'s number has already been removed from the server`, false, false);
          }); // if it fails for some reason there will be inconsistencies between the app and server data 
          createNotification(`${persons[i].name}'s number has been deleted.`, true, false);
        }
      }
    }
    return onClicks;
  }

  const onClicks = generateOnClickFunctions(); // store the functions in a data structure

  // a lot of repetitive state-passing code; there has to be a better way...
  return (
    <div className="headDiv">
      <h2>Phonebook</h2>
      {notification === "" ? null : <Notification message={notification} isSuccess={isSuccessNotification} />}
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
