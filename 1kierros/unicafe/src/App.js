import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all }) => {
  const positive = (good / all * 100 ).toString() + "%"
  const average = (good - bad) / all
  if (all == 0) return (
    <div>
      No feedback given
    </div>
    )
  else { return ( 
  <div>
    <table>
      <thead><tr>
        <td>Statistics</td>
      </tr></thead>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="positive" value={positive} />
      <StatisticLine text="average" value={average} />
      </tbody>
    </table>
  </div>
  )}
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, increaseAll] = useState(0)
  

  const handleGood = () => {
    setGood(good + 1)
    increaseAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    increaseAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    increaseAll(all + 1)
  }

  return (
    <div>
      <h1>Feedback here:</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App