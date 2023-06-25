import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({ variant, message }) => {
  return (
    <Alert variant={variant} className="m-auto mb-3">
      {message}
    </Alert>
  )
}

export default ErrorMessage
