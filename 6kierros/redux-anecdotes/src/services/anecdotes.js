import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdote) => {
    const anecdoteObject = { 
        content: anecdote,
        votes: 0
     }
    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const vote = async(anecdoteObject, id) => {
    const address = `${baseUrl}/${id}`
    const response = await axios.put(address, anecdoteObject)
    return response.data
}

export default { getAll , createNew, vote }