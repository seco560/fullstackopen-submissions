import React, { useState } from 'react';
import './App.css';

const FeedbackButton = ({ onClick, text }) => (
  // className is a slight hack to get different colors under the buttons
  <span>
    <button className={text} onClick={onClick}>{text}</button>
  </span>
)

const FeedbackDisplay = ({ category, amount }) => (
  <tr><td>{category}</td><td>{amount}</td></tr>
)

const StatisticsDisplay = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const calculateAverage = () => (good - bad) / total;
  const calculatePositivePercent = () => (100 * good) / total;

  /* checking for NaN to display '-' when there is no feedback
   * rounding the statistic and positive percentage and displaying only two decimal places
   * both slight changes to make the page less confusing */
  return (
    <table>
      <tbody>
        <tr>
          <td>Average</td>
          <td>{Number.isNaN(calculateAverage())  ? "-" : 
        (Math.round(calculateAverage() * 100) / 100).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{Number.isNaN(calculatePositivePercent()) ? "-" : 
        (Math.round(calculatePositivePercent() * 100) / 100).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
} // put second table in this component as it wouldn't make much sense to split it up

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
   * technically only the percentage and percentage are "statistics"; the others are simple displays
   * note on table(s) - split it up into two tables to fit overall structure of my site - hope that is fine */
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
        <table>
          <tbody>
          <FeedbackDisplay category={goodStr} amount={good} />
          <FeedbackDisplay category={neutralStr} amount={neutral} />
          <FeedbackDisplay category={badStr} amount={bad} />
          </tbody>
        </table>
        }
      </div>
      <hr />
      <h1>Statistics</h1>
      {(good === 0 && neutral === 0 && bad === 0) ? "No statistics to show." : 
        <StatisticsDisplay good={good} neutral={neutral} bad={bad} />
      }
      <hr />
    </div>
  )
}

export default App