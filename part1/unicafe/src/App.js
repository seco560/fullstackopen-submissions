import React, { useState } from 'react'

const FeedbackButton = ({ onClick, text }) => (
  <span>
    <button onClick={onClick}>{text}</button>
  </span>
)

const FeedbackDisplay = ({ category, amount }) => (
  <p>{category} {"->"} {amount}</p>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodStr = "gOOd";
  const neutralStr = "Neutral";
  const badStr = "bAd";

  const incrementGood = () => {
    setGood(good + 1);
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  }
  const incrementBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Unicafe Feedback System</h1>
      <p>How was your experience in our cafe today?</p>
      <div>
        <FeedbackButton onClick={incrementGood} text={goodStr} />
        <FeedbackButton onClick={incrementNeutral} text={neutralStr} />
        <FeedbackButton onClick={incrementBad} text={badStr} />
      </div>
      <h1>Statistics</h1>
      <div>
        <FeedbackDisplay category={goodStr} amount={good} />
        <FeedbackDisplay category={neutralStr} amount={neutral} />
        <FeedbackDisplay category={badStr} amount={bad} />
      </div>
    </div>
  )
}

export default App