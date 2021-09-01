import React, { useState } from 'react';
import './App.css';

const GenericButton = ({text, onClick}) => (
  <div>
    <button onClick={onClick}>{text}</button>
  </div>
);

const AnecdoteDisplay = ({anecdote}) => (
  <h3>"{anecdote}"</h3>
);

const VoteDisplay = ({votes}) => (
  <h4>This bit of wisdom has {votes} votes.</h4>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    'Let us change our traditional attitude to the construction of programs. Instead of imagining that our main task is to instruct a computer what to to, let us concentrate rather on explaining to human beings what we want a computer to do.',
    'The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.',
    'The software isn\'t finished until the last user is dead.',
  ]

  const [selected, setSelected] = useState(0);
  const [voteArray, setVoteArray] = useState(Array.apply(null, Array(anecdotes.length)).map(Number.prototype.valueOf,0));

  // setVoteArray();

  const setRandomIndex = () => { 
    let result = selected;
    do { // ensure we don't display the same anecdote twice in a row
      result = Math.floor(Math.random() * anecdotes.length); 
    } while (result === selected);
    setSelected(result);
  }

  const incrementVote = () => {
    const voteArrayCopy = [...voteArray];
    voteArrayCopy[selected] += 1 ;
    setVoteArray(voteArrayCopy);
  }

  return (
    <div className="mainDiv">
      <h1>Random Software Engineering Anecdote Generator</h1>
      <AnecdoteDisplay anecdote={anecdotes[selected]} />
      <VoteDisplay votes={voteArray[selected]} />
      <GenericButton text="Add Vote" onClick={incrementVote} />
      <GenericButton text="Next Anectode" onClick={setRandomIndex} />
    </div>
  )
}

export default App