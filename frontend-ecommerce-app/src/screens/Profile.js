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
  Table,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/slices/userSlice'
import { ToastContainer } from 'react-toastify'
import Message from '../components/messages/Message'
import { Link } from 'react-router-dom'
import { getUserOrders } from '../redux/slices/orderSlice'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const userSliceData = useSelector((state) => state.user)
  const orderSliceData = useSelector((state) => state.order)
  const [isLoading, setIsLoading] = useState(userSliceData.isloading)
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(
      updateProfile({
        name,
        email,
        password: newPassword,
        token: userSliceData.user.token,
      })
    ).then((res) => setIsLoading(userSliceData.isloading))
  }
  useEffect(() => {
    dispatch(getUserOrders(userSliceData.user.token))
    setName(userSliceData.user.name)
    setEmail(userSliceData.user.email)
  }, [])
  return (
    <>
      <section className="tabsSection">
        <Tabs
          defaultActiveKey="profile"
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="profile" title="Profile" className="tabSection">
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
              <Message variant="danger" message={userSliceData.errorMessage} />
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
                    'Update'
                  )}
                </Button>
              </div>
            </Form>
          </Tab>
          <Tab eventKey="orders" title="My Orders">
            <Table
              striped
              bordered
              hover
              responsive
              className="ordersTable table-sm text-center text-capitalize"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Paid</th>
                  <th>paid at</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {orderSliceData.userOrders.length
                  ? orderSliceData.userOrders.map((order, index) => (
                      <tr key={order._id} className="fw-bold">
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={`/order/${order._id}`}
                            className="text-decoration-underline"
                          >
                            {order._id}
                          </Link>
                        </td>
                        <td>
                          {order.isPaid ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="lime"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="yellow"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                            </svg>
                          )}
                        </td>
                        <td>
                          {order.paidAt ? order.paidAt.slice(0, 10) : '....'}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="lime"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="yellow"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                            </svg>
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </section>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default Profile
