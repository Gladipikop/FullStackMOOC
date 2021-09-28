import React, { useState } from 'react'

const GenerateNumber = () => {
  let number = Math.floor(Math.random() * 7)
  return (
    number
  )
}

const GetMostVotesAnecdote = (array) => {
  let mostVotesIndex = 0;
  let i;
  for (i = 1; i < array.length; i++) {
    if (array[i] > array[mostVotesIndex]) {
      mostVotesIndex = i;
    }
  }
  return (
    mostVotesIndex
  )
}

// const IncreaseNumber = (array,current) => {
  
// }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const votes = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(votes)

  const HandleVotes = (array, selected) => {
    const copy = [...array]
    console.log("Current Anecdote votes is: ",copy[selected])
    copy[selected] += 1
    setVoteCount(copy)
  }
  console.log("Selected is: ", selected, " and current array is: ", votes[selected])
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <div>
        <button onClick={()=>HandleVotes(voteCount, selected)} >vote</button>
        <button onClick={() => setSelected(GenerateNumber())} >next anecdote</button>
        <p>has {voteCount[selected]} Votes</p>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        <p>{anecdotes[GetMostVotesAnecdote(voteCount)]}</p>
        <p>has {voteCount[GetMostVotesAnecdote(voteCount)]} votes</p>
      </div>
    </div>
  )
}

export default App