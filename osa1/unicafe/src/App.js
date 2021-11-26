import React, { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)
const Button = ({ text, buttonHandler }) => (
  <button onClick={buttonHandler}>{text}</button>
)
const Statistics = ({ good, neutral, bad }) => {

  const sum = good + neutral + bad

  if (sum === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  const avg = (good - bad) / sum
  const pos = (good / sum) * 100
  const posString = pos + " %" 

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={posString} />
        </tbody>
      </table>
    </>
  )
}
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [goodValue, setGoodValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [badValue, setBadValue] = useState(0)
  const title = "give feedback"

  const goodValueHandler = () => (
    setGoodValue( goodValue + 1 )
  )
  const neutralValueHandler = () => (
    setNeutralValue( neutralValue + 1 )
  )
  const badValueHandler = () => (
    setBadValue( badValue + 1 )
  ) 

  
  return (
    <div>
      <Header text={title}/>
      <Button text="good" buttonHandler={goodValueHandler}/>
      <Button text="neutral" buttonHandler={neutralValueHandler}/>
      <Button text="bad" buttonHandler={badValueHandler}/>
      <Statistics good={goodValue} neutral={neutralValue} bad={badValue} />
    </div>
  )
}

export default App;
