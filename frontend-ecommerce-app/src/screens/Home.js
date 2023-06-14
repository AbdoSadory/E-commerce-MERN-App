import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product/Product'
import axios from 'axios'
const Home = () => {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products')
    // or "proxy": "http://localhost:5000/",
    setProducts(data)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <>
      <h1 className="text-center">Welcome to our Project</h1>
      <h2>Latest Products</h2>
      <Row className="justify-content-between">
        {products.length ? (
          products.map((product) => (
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
          ))
        ) : (
          <h3 className="text-center text-light">No Products Yet .... </h3>
        )}
      </Row>
    </>
  )
}

export default Home
