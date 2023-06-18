import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className="m-auto text-center">
      <span
        style={{
          fontSize: '30px',
          verticalAlign: 'text-bottom',
        }}
      >
        Loading{' '}
      </span>
      <Spinner
        animation="border"
        variant="warning"
        style={{
          width: '40px',
          height: '40px',
          borderWidth: '10px',
          animationDuration: '0.5s',
        }}
      ></Spinner>
    </div>
  )
}

export default Loader
