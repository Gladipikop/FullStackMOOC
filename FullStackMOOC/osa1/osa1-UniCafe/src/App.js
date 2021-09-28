import React, { useState } from 'react'
const Statistics = (props) => {
  if (props.stats[3] === 0) {
    return (
      <div>
        <p>No Feedback given</p>
      </div>
    )
  } else {
    return (
      <>
        {/* No idea how to split one components data to different rows in html array*/}
        <StatisticLine text={"good"} value={props.stats[0]}/>
        <StatisticLine text={"neutral"} value={props.stats[1]}/>
        <StatisticLine text={"bad"} value={props.stats[2]}/>
        <StatisticLine text={"all"} value={props.stats[3]}/>
        <StatisticLine text={"average"} value={props.stats[4]}/>
        <StatisticLine text={"positive"} value={props.stats[5]} />
      </>
    )
  }
}

const StatisticLine = (props) => {
  if (props.text !== "positive") {
    return (
      <>
            <p>{props.text} {props.value}</p>
      </>  
    )
  }
  else {
    return (
      <>
            <p>{props.text} {props.value*100}% </p>
      </>  
    )
  }
}
const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>
      {props.text}
      </button>
    </>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)
  const positive = good / (good + neutral + bad)
  const statistics = [good, neutral, bad , all , average, positive]
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      {/* <Button onClick={() => setBad(bad + 1)}/> */}


      <h1>statistics</h1>
      <Statistics stats={statistics}/>
    </div>
  )
}

export default App
