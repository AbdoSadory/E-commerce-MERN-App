import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, message }) => {
  return (
    <Alert variant={variant} className="m-auto mb-2">
      {message}
    </Alert>
  )
}

export default Message
