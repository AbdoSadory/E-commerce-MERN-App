import React from 'react'
import { Col, Nav, Row } from 'react-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <section className="processStepSection rounded">
      <Row className="justify-content-center m-auto">
        <Col className="text-center">
          {step1 ? (
            <p className="processStep text-center m-0 p-1 btn btn-success">
              Sign In
            </p>
          ) : (
            <p className="processStep text-center m-0 p-1 btn btn-success disabled">
              Sign In
            </p>
          )}
        </Col>
        <Col className="text-center">
          {step2 ? (
            <p className="processStep text-center m-0 p-1 btn btn-success">
              Shipping
            </p>
          ) : (
            <p className="processStep text-center m-0 p-1 btn btn-success disabled">
              Shipping
            </p>
          )}
        </Col>
        <Col className="text-center">
          {step3 ? (
            <p className="processStep text-center m-0 p-1 btn btn-success ">
              Payment
            </p>
          ) : (
            <p className="processStep text-center m-0 p-1 btn btn-success disabled">
              Payment
            </p>
          )}
        </Col>
        <Col className="text-center">
          {step4 ? (
            <p className="processStep text-center m-0 p-1 btn btn-success">
              Order
            </p>
          ) : (
            <p className="processStep text-center m-0 p-1 btn btn-success disabled">
              Order
            </p>
          )}
        </Col>
      </Row>
    </section>
  )
}

export default CheckoutSteps
