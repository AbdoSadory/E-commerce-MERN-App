import React from 'react'
import products from '../products'
import { Link, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ProductRating from '../components/rating/Rating'

const ProductDetails = () => {
  let params = useParams()
  let product = products.find((product) => product._id === params.id)
  console.log(product)
  return (
    <>
      <section>
        <Breadcrumb className="productDetailsBreadcrumb">
          <LinkContainer to="/">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item linkAs="span">{product.name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <section>
        <Row>
          <Col className="mt-3" md="6">
            <Image
              src={product.image}
              alt={product.name}
              className=" rounded"
              fluid
            />
          </Col>
          <Col className="mt-3">
            <ListGroup as="ul">
              <ListGroupItem as="li">
                <h1 className="fs-5 m-0">{product.name}</h1>
              </ListGroupItem>
              <ListGroupItem as="li">
                <span className="fw-bold">Description</span> :{' '}
                {product.description}
              </ListGroupItem>
              <ListGroupItem as="li">
                <ProductRating
                  rating={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroupItem>
            </ListGroup>
            <ListGroup as="ul" className="mt-2">
              <ListGroupItem
                as="li"
                className=" border-light border-bottom border-bottom-4"
              >
                <span className="fw-bold">Price</span> : {product.price}
              </ListGroupItem>
              <ListGroupItem
                as="li"
                className=" border-light border-bottom border-bottom-4"
              >
                {product.countInStock ? (
                  <span className="stockStatus">
                    <svg
                      className="me-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="#fff"
                      viewBox="0 0 640 512"
                    >
                      <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z" />
                    </svg>
                    In Stock
                  </span>
                ) : (
                  <span className="stockStatus">
                    <svg
                      className="me-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="#fff"
                      viewBox="0 0 512 512"
                    >
                      <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                    </svg>
                    Out Of Stock
                  </span>
                )}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  variant="light"
                  disabled={product.countInStock ? false : true}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default ProductDetails
