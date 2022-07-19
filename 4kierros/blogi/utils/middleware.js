const {info, error} = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, _res, next) => {
    info('Method:', req.method)
    info('Path:', req.path)
    info('Body:', req.body)
    info('------')
    next()
}

const tokenExtractor = (req, _res, next) => {
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  const token = getTokenFrom(req)
  req.token = token
  next()
}

const userExtractor = async (req, _res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send( { error: 'unknown endpoint' } )
}

const errorHandler = (error, _request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(400).json({
        error: 'invalid token'
      })
    }
  
    next(error)
  }

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
}