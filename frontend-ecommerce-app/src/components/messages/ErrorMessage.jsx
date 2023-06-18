import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({ variant, message }) => {
  return <Alert variant={variant}>{message}</Alert>
}

export default ErrorMessage