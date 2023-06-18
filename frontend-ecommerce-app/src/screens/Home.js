import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product/Product'
import { useDispatch, useSelector } from 'react-redux'
import { allProducts } from '../redux/slices/productsSlice'
import { ToastContainer } from 'react-toastify'
import Loader from '../components/messages/Loader'
import ErrorMessage from '../components/messages/ErrorMessage'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const productsSliceData = useSelector((state) => state.products.initialState)
  const dispatch = useDispatch()
  useEffect(() => {
    productsSliceData || dispatch(allProducts())
    productsSliceData && setIsLoading(productsSliceData.isloading)
    productsSliceData && setError(productsSliceData.error)
  }, [productsSliceData])
  return (
    <>
      <h1 className="text-center m-0">Welcome to our Project</h1>
      <h2>Latest Products</h2>
      <Row className="justify-content-between">
        {productsSliceData?.error && productsSliceData.error}
        {isLoading ? (
          <Loader />
        ) : productsSliceData?.products?.length ? (
          productsSliceData.products.map((product) => (
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
        ) : error ? (
          <h3 className="text-center text-dark text-capitalize">
            <ErrorMessage
              variant={'primary'}
              message={productsSliceData && productsSliceData.errorMessage}
            />
          </h3>
        ) : (
          <h3 className="text-center text-light text-capitalize">
            No Products Yet on server....
          </h3>
        )}
      </Row>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default Home
