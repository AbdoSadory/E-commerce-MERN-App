import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import EmptyCart from '../components/messages/EmptyCart'
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'

const Cart = () => {
  const params = useParams()
  const location = useLocation()
  const cartSliceData = useSelector((state) => state.cart)
  if (params.id) {
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
  }
  // console.log(params && params.id)
  // console.log(cartSliceData.items)
  return (
    <>
      <h2 className="text-capitalize">shipping cart</h2>
      {cartSliceData.items.length ? (
        cartSliceData.items.map((item) => (
          <Row key={item.product._id}>
            <Col md={2}>
              <Image
                src={item.product.image}
                alt={item.product.name}
                className="w-100"
              />
            </Col>
            <Col md={4}>
              <h5>
                <Link
                  to={`/product/${item.product._id}`}
                  className="text-decoration-underline"
                >
                  {item.product.name}
                </Link>
              </h5>
            </Col>
          </Row>
        ))
      ) : (
        <EmptyCart variant="warning" message="Cart is empty" />
      )}
    </>
  )
}

export default Cart
