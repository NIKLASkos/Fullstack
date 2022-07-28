import { vote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    // sort for anecdote with most likes to be first in array
  const anecdotes = props.anecdotes
  console.log('anecdotes', anecdotes)
  const arrayForSorting = [...anecdotes]
  const sortedAnecdotes = arrayForSorting.sort((a, b) => b.votes - a.votes)

  const addNotification = (text, time) => {
    props.setNotification(text)
    setTimeout(() => {
        props.removeNotification()
    }, time * 1000)
  }

  const voteById = async (anecdote) => {
    console.log('vote', anecdote.id)
    const addedVote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    await anecdoteService.vote(addedVote, anecdote.id)
    props.vote(anecdote.id)
    addNotification(anecdote.content, 5)
  }

  const style = {
    padding: 5
  }

  return (
    <div>
        {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id} style={style}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteById(anecdote)}>vote</button>
            </div>
            </div>
        )}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
    anecdotes: state.anecdotes,
    notification: state.notification
    }
}

const mapDispatchToProps = {
    setNotification,
    removeNotification,
    vote
}

const connectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedList