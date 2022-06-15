import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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
   
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState(Array(7).fill(0))
  const mostVotes = Math.max(...points)
  const indexOfMostVotes = points.indexOf(mostVotes)
  console.log(points)

  const randomAnecdote = () => {
    const randomNumberBetweenZeroAndSix = Math.floor(Math.random() * 7)
    console.log(randomNumberBetweenZeroAndSix)
    setSelected(randomNumberBetweenZeroAndSix)
  }

  const voteAnecdote = () => {
    const copyOfVotes = [...points]
    copyOfVotes[selected] += 1
    setVote(copyOfVotes)
  }

  return (
    <div>
      <h1>Anecdote:</h1>
      {anecdotes[selected]}
      <br />
      <p>This anecdote has {points[selected]} votes.</p>
      <br />
      <Button handleClick={voteAnecdote} text="vote this anecdote" />
      <Button handleClick={randomAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      {anecdotes[indexOfMostVotes]} (it has {mostVotes} votes)
    </div>
  )
}

export default App