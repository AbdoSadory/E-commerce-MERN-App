import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/checkOut/CheckoutSteps'
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from 'react-bootstrap'
import EmptyCart from '../components/messages/EmptyCart'
import { Link, useNavigate } from 'react-router-dom'
import { orderSlice, placeOrder } from '../redux/slices/orderSlice'
import { ToastContainer } from 'react-toastify'
import Message from '../components/messages/Message'

const PlaceOrder = () => {
  const userSliceData = useSelector((state) => state.user)
  const cartSliceData = useSelector((state) => state.cart)
  const orderSliceData = useSelector((state) => state.order)
  const [isLoading, setIsLoading] = useState(cartSliceData.isloading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const itemsPrice = cartSliceData.items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  )
  const shippingPrice = itemsPrice >= 200 ? 0 : 100
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2))
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
  const placeOrderHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(
      placeOrder({
        token: userSliceData.user.token,
        orderItems: cartSliceData.items,
        shippingAddress: cartSliceData.shippingAddress,
        paymentMethod: cartSliceData.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        isPaid: false,
      })
    ).then((res) => {
      setIsLoading(false)
      res.payload.success && navigate(`/order/${res.payload.order.orderID}`)
    })
  }
  return (
    <>
      <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
      {orderSliceData.error && (
        <Message variant="danger" message={orderSliceData.errorMessage} />
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant="danger">
            <ListGroup.Item className="border-bottom border-secondary">
              <h2 className="text-dark">Shipping</h2>
              <p>
                <span className="text-capitalize fw-bold">full address: </span>
                {`${cartSliceData.shippingAddress.address}, ${cartSliceData.shippingAddress.city}, ${cartSliceData.shippingAddress.country}`}
              </p>
              <p>
                <span className="text-capitalize fw-bold">postal code: </span>
                {`${cartSliceData.shippingAddress.postalCode}`}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="border-bottom border-secondary">
              <h2 className="text-dark">Payment Method</h2>
              <p>
                <span className="text-capitalize fw-bold">Method: </span>
                {cartSliceData.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="text-dark">Order Items</h2>
              {cartSliceData.items.length ? (
                <ListGroup>
                  {cartSliceData.items.map((product) => (
                    <ListGroup.Item
                      variant="secondary"
                      key={product.product._id}
                    >
                      <Row>
                        <Col md={2}>
                          <Image
                            src={product.product.image}
                            alt={product.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${product.product._id}`}
                            className="text-decoration-underline text-dark"
                          >
                            {product.product.name}
                          </Link>
                        </Col>
                        <Col>
                          {product.qty} x {product.product.price}$ =
                          {product.qty * product.product.price}$
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <EmptyCart
                  variant="danger"
                  message={'No Products In The Cart'}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className="orderSummarySection">
          <Card>
            <ListGroup>
              <ListGroup.Item className="border-bottom border-secondary">
                <h2 className="text-center text-dark m-0 p-0">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="border-bottom border-secondary">
                <Row>
                  <Col className="fw-bold text-primary">Items Price:</Col>
                  <Col className="text-dark">{itemsPrice} $</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="border-bottom border-secondary">
                <Row>
                  <Col className="fw-bold text-primary">Shipping:</Col>
                  <Col className="text-dark">{shippingPrice} $</Col>
                </Row>
                <p className="m-0 text-dark text-capitalize">
                  free shipping for products price over than 200$
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="border-bottom border-secondary">
                <Row>
                  <Col className="fw-bold  text-primary">Tax:</Col>
                  <Col className="text-dark">{taxPrice} $</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="border-bottom border-secondary">
                <Row>
                  <Col className="fw-bold  text-primary">Total Price:</Col>
                  <Col className="text-dark">{totalPrice} $</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="text-center">
                <Button
                  type="button"
                  className="btn-danger"
                  disabled={cartSliceData.items.length === 0 ? true : false}
                  onClick={(e) => placeOrderHandler(e)}
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
                    'Proceed'
                  )}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default PlaceOrder
