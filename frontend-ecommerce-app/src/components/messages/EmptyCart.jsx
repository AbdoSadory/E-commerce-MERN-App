import React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const EmptyCart = ({ variant, message }) => {
  return (
    <Alert variant={variant}>
      {message},{' '}
      <Link to="/" className="fw-bold text-decoration-underline">
        Go Home
      </Link>
    </Alert>
  )
}

export default EmptyCart
