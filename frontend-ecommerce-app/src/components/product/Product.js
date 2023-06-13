import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductRating from '../rating/Rating'

const Product = ({ id, name, image, price, rating, numReviews }) => {
  return (
    <Card className="mx-auto my-2 rounded" style={{ width: '18rem' }}>
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body className="p-2">
        <Link to={`/product/${id}`}>
          <Card.Title as="h4" className="text-decoration-underline">
            {name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <ProductRating rating={rating} text={`from ${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h4">{price}$</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
