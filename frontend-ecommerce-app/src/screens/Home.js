import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/product/Product'

const Home = () => {
  return (
    <>
      <h1 className="text-center">Welcome to our Project</h1>
      <h2>Latest Products</h2>
      <Row className="justify-content-between">
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
              rating={product.rating}
              numReviews={product.numReviews}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
