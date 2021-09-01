import React, { useState } from 'react';
import './App.css';

const FeedbackButton = ({ onClick, text }) => (
  // className is a slight hack to get different colors under the buttons
  <span>
    <button className={text} onClick={onClick}>{text}</button>
  </span>
)

const FeedbackDisplay = ({ category, amount }) => (
  <p>{category} {"->"} {amount}</p>
)

const StatisticsDisplay = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const calculateAverage = () => (good - bad) / total;
  const calculatePositivePercent = () => (100 * good) / total;

  /* checking for NaN to display '-' when there is no feedback
   * rounding the statistic and positive percentage and displaying only two decimal places
   * both slight changes to make the page less confusing */
  return (
    <div>
      <p>Average: {Number.isNaN(calculateAverage())  ? "-" : 
        (Math.round(calculateAverage() * 100) / 100).toFixed(2)}</p>
      <p>Positive: {Number.isNaN(calculatePositivePercent()) ? "-" : 
        (Math.round(calculatePositivePercent() * 100) / 100).toFixed(2)}</p>
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodStr = "gOOd";
  const neutralStr = "Neutral";
  const badStr = "baD";

  const incrementGood = () => {
    setGood(good + 1);
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  }
  const incrementBad = () => {
    setBad(bad + 1);
  }

  /* note on naming - I called the StatisticLine in the spec FeedbackDisplay as it made more sense to me
   * technically only the percentage and percentage are "statistics"; the others are simple displays*/
  return (
    <div className="mainContent">
      <hr />
      <h1>Unicafe Feedback System</h1>
      <p>How was your experience in our cafe today?</p>
      <div className="buttonBar">
        <FeedbackButton onClick={incrementGood} text={goodStr} />
        <FeedbackButton onClick={incrementNeutral} text={neutralStr} />
        <FeedbackButton onClick={incrementBad} text={badStr} />
      </div>
      <hr />
      <h1>Feedback</h1>
      <div>
        {(good === 0 && neutral === 0 && bad === 0) ? "No feedback gathered yet." : 
        <div>
          <FeedbackDisplay category={goodStr} amount={good} />
          <FeedbackDisplay category={neutralStr} amount={neutral} />
          <FeedbackDisplay category={badStr} amount={bad} />
        </div>
        }
      </div>
      <hr />
      <h1>Statistics</h1>
      {(good === 0 && neutral === 0 && bad === 0) ? "No statistics to show." : 
      <div>
        <StatisticsDisplay good={good} neutral={neutral} bad={bad} />
      </div>
      }
      <hr />
    </div>
  )
}

export default App