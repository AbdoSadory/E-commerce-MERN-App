import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { addShippingAddress } from '../redux/slices/cartSlice'
import { ToastContainer } from 'react-toastify'
import CheckoutSteps from '../components/checkOut/CheckoutSteps'
import Message from '../components/messages/Message'

const Shipping = () => {
  const cartSliceData = useSelector((state) => state.cart)
  const [country, setCountry] = useState(cartSliceData.shippingAddress.country)
  const [city, setCity] = useState(cartSliceData.shippingAddress.city)
  const [address, setAddress] = useState(cartSliceData.shippingAddress.address)
  const [postalCode, setPostalCode] = useState(
    cartSliceData.shippingAddress.postalCode
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addShippingAddress({ country, city, address, postalCode }))
    navigate('/payment')
  }
  return (
    <>
      <section className="formContainer">
        <div>
          <h2 className="text-capitalize text-center mb-3">Shipping</h2>
          <CheckoutSteps step1={true} step2={true} />
          {cartSliceData.error && (
            <Message variant="danger" message={cartSliceData.errorMessage} />
          )}
          <Form
            onSubmit={(e) => {
              submitHandler(e)
            }}
          >
            <Form.Group as={Row} className="m-auto" controlId="country">
              <Form.Label column sm="2">
                Country
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="country"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value)
                  }}
                />
              </Col>
            </Form.Group>{' '}
            <Form.Group as={Row} className="m-auto" controlId="city">
              <Form.Label column sm="2">
                City
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value)
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="m-auto" controlId="address">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="m-auto" controlId="postalCode">
              <Form.Label column sm="2">
                Postal Code
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value)
                  }}
                />
              </Col>
            </Form.Group>
            <div className="text-center m-auto">
              <Button
                type="submit"
                className="text-capitalize d-inline-block"
                style={{ minWidth: '110px' }}
              >
                {cartSliceData.isloading ? (
                  <Spinner
                    animation="border"
                    variant="warning"
                    style={{
                      width: '20px',
                      height: '20px',
                      borderWidth: '2px',
                      animationDuration: '0.5s',
                    }}
                  ></Spinner>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </Form>
        </div>
      </section>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default Shipping
