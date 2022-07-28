import anecdotes from "../services/anecdotes"
import { connect } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

    const setNotification = (text, time) => {
        props.setNotification(text)
        let onGoingTimer
        setTimeout(() => {
            onGoingTimer = true
            props.removeNotification()
        }, time * 1000)
        if(onGoingTimer) {
            clearTimeout()
            onGoingTimer = false
        }
    }

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdotes.createNew(anecdoteText)
        props.createAnecdote(newAnecdote)
        setNotification(`You added: ${anecdoteText}`, 5)
    }

    return(
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </div>
    )
}

const mapDispatchToProps = {
        createAnecdote,
        setNotification,
        removeNotification
    }


const connectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedForm