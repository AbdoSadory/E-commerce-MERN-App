import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import EmptyCart from '../components/messages/EmptyCart'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { addItem, removeItem } from '../redux/slices/cartSlice'

const Cart = () => {
  const navigate = useNavigate()
  const cartSliceData = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id))
  }
  const checkOutHandler = () => {
    console.log('Check out')
    navigate('/login?redirect=shipping')
  }
  return (
    <>
      <h2 className="text-capitalize">shipping cart</h2>
      <Row>
        <Col className="shippingCartProductsContainer" lg={6}>
          {cartSliceData.items.length ? (
            cartSliceData.items.map((item) => (
              <Row
                key={item.product._id}
                className="productCardInCart align-items-center"
              >
                <Col className="shippingCartProductImageContainer" md={2}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col className="shippingCartProductTitleContainer" md={4}>
                  <h4 className="m-0">
                    <Link
                      to={`/product/${item.product._id}`}
                      className="text-decoration-underline"
                    >
                      {item.product.name}
                    </Link>
                  </h4>
                </Col>
                <Col
                  className="shippingCartProductPriceContainer text-center"
                  md={2}
                >
                  {item.product.price}$
                </Col>
                <Col className="shippingCartProductQtyContainer" md={2}>
                  <Form.Control
                    variant="primary"
                    as="select"
                    className="text-center"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addItem({
                          product: item.product,
                          qty: Number(e.target.value),
                        })
                      )
                    }
                  >
                    {[...Array(item.product.countInStock).keys()].map((x) => (
                      <option key={x} value={x + 1} style={{ color: 'blue' }}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    style={{ backgroundColor: '#FF1E1E' }}
                    onClick={(e) => removeFromCartHandler(item.product._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 448 512"
                      fill="#fff"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </Button>
                </Col>
              </Row>
            ))
          ) : (
            <EmptyCart variant="warning" message="Cart is empty" />
          )}
        </Col>
        <Col lg={6}>
          <ListGroup as="ul">
            <ListGroupItem as="li">
              <h2 className="text-capitalize fw-normal m-0">
                subtotal (
                {cartSliceData.items.reduce((acc, item) => acc + item.qty, 0)}){' '}
                items
              </h2>
            </ListGroupItem>
            <ListGroupItem as="li">
              <p className="text-capitalize m-0">
                subtotal price :{' '}
                {cartSliceData.items
                  .reduce((acc, item) => acc + item.product.price * item.qty, 0)
                  .toFixed(2)}{' '}
                $
              </p>
            </ListGroupItem>
            <ListGroupItem as="li" className="text-center">
              <Button
                className="tex-center text-capitalize"
                type="button"
                variant="danger"
                disabled={cartSliceData.items.length === 0}
                onClick={() => checkOutHandler()}
              >
                proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default Cart
