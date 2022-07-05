const {info, error} = require('./logger')

const requestLogger = (req, _res, next) => {
    info('Method:', req.method)
    info('Path:', req.path)
    info('Body:', req.body)
    info('------')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send( { error: 'unknown endpoint' } )
}

const errorHandler = (error, _request, response, next) => {
    error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}