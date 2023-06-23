const notFound = (req, res, next) => {
  const err = new Error(`can't find ${req.originalUrl}`)
  res.status(404)
  next(err)
}
const errorHandler = (err, req, res, next) => {
  console.log('hi from global error middleware', res.statusCode)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode // in case you get 200 code in error case
  res.status(statusCode).send({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'null' : err.stack,
  })
}

export { notFound, errorHandler }
