import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Seco Vlad'},
  ]); 
  const [ newName, setNewName ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const personToAdd = {
      name: newName,
    }
    setPersons(persons.concat(personToAdd));
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div className="headDiv">
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App
