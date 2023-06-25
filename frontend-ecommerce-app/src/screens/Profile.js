import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  Button,
  Spinner,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/slices/userSlice'
import { ToastContainer } from 'react-toastify'
import ErrorMessage from '../components/messages/ErrorMessage'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const userSliceData = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProfile({
        name,
        email,
        password: newPassword,
        token: userSliceData.user.token,
      })
    )
  }
  useEffect(() => {
    setName(userSliceData.user.name)
    setEmail(userSliceData.user.email)
  }, [])
  return (
    <>
      <section className="profileSection">
        <Tabs
          defaultActiveKey="profile"
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="profile" title="Profile">
            <ListGroup as="ul" variant="warning">
              <ListGroupItem as="li" className="fw-bold">
                Name : {userSliceData.user.name}
              </ListGroupItem>
              <ListGroupItem as="li" className="fw-bold">
                Email : {userSliceData.user.email}
              </ListGroupItem>
            </ListGroup>
          </Tab>
          <Tab eventKey="updateProfile" title="Update Profile">
            {userSliceData.error && (
              <ErrorMessage
                variant="danger"
                message={userSliceData.errorMessage}
              />
            )}
            <Form
              onSubmit={(e) => {
                submitHandler(e)
              }}
            >
              <Form.Group as={Row} className="m-auto" controlId="name">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="m-auto" controlId="email">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    className="mb-2"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="m-auto" controlId="password">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    className="mb-2"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
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
                  {userSliceData.isloading ? (
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
                    'Update'
                  )}
                </Button>
              </div>
            </Form>
          </Tab>
          <Tab eventKey="orders" title="My Orders">
            Tab content for My Orders
          </Tab>
        </Tabs>
      </section>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default Profile
