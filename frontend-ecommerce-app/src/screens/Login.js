import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Message from '../components/messages/Message'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userSliceData = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(userSliceData.isloading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(logIn({ email, password }))
      .then((res) => {
        if (res.payload.isLogIn) {
          navigate('/')
        }
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e.message)
        setIsLoading(false)
      })
  }
  useEffect(() => {}, [])
  return (
    <>
      <section className="formContainer">
        <div>
          <h2 className="text-capitalize text-center">Log in</h2>
          {userSliceData.error && (
            <Message variant="danger" message={userSliceData.errorMessage} />
          )}
          <Form
            onSubmit={(e) => {
              submitHandler(e)
            }}
          >
            <Form.Group as={Row} className="m-auto" controlId="email">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="m-auto" controlId="password">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  required
                />
              </Col>
            </Form.Group>
            <div className="text-center m-auto">
              <Button
                type="submit"
                className="text-capitalize d-inline-block"
                style={{ minWidth: '110px' }}
              >
                {isLoading ? (
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
                  'login'
                )}
              </Button>
            </div>
          </Form>
          <p className="text-capitalize pt-3 text-center">
            new customer ?{' '}
            <Link className="text-danger fw-bold" to="/register">
              Register
            </Link>
          </p>
        </div>
      </section>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default Login
