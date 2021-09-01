import React, { useState } from 'react'

const GenericButton = ({text, onClick}) => (
  <div>
    <button onClick={onClick}>{text}</button>
  </div>
);

const AnecdoteDisplay = ({anecdote}) => (
  <h3>{anecdote}</h3>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);

  const setRandomIndex = () => { 
    let result = selected;
    do { // ensure we don't display the same anecdote twice in a row
      result = Math.floor(Math.random() * anecdotes.length); 
    } while (result === selected);
    setSelected(result);
  }

  return (
    <div>
      <AnecdoteDisplay anecdote={anecdotes[selected]} />
      <GenericButton text="Next Anectode" onClick={setRandomIndex} />
    </div>
  )
}

export default App