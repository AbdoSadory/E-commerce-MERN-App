import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import Loader from "../components/messages/Loader";
import ProductRating from "../components/rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  addReviewToProduct,
  getProductDetails,
} from "../redux/slices/productDetailsSlice";
import { addItem } from "../redux/slices/cartSlice";
import Message from "../components/messages/Message";
import HeadHelmet from "../components/helmet/HeadHelmet";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [userReviewed, setUserReviewed] = useState(false);
  let params = useParams();
  const productDetailsSliceData = useSelector((state) => state.productDetails);
  const userSliceData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductDetails(params.id)).then((res) => {
      let isUserReviewed = res.payload.product.reviews.find(
        (review) => review.user === userSliceData.user.id
      );
      setUserReviewed(isUserReviewed);
    });
  }, []);

  const addToCartHandler = () => {
    dispatch(
      addItem({ product: productDetailsSliceData.product, qty: Number(qty) })
    );
    navigate(`/cart/${params.id}/?qty=${qty}`);
  };
  const addReview = (e) => {
    e.preventDefault();
    console.log(rating, comment);
    if (rating && comment) {
      dispatch(
        addReviewToProduct({
          token: userSliceData.user.token,
          productId: params.id,
          rating,
          comment,
        })
      )
        .then((res) => window.location.reload())
        .catch((err) => console.log(err.message));
    }
  };
  return (
    <>
      <HeadHelmet
        title={productDetailsSliceData && productDetailsSliceData.product.name}
        desc={
          productDetailsSliceData && productDetailsSliceData.product.description
        }
        keywords="electronics, buy, cheap, phones, laptops"
      />
      {productDetailsSliceData.isloading ? (
        <Loader />
      ) : productDetailsSliceData.error ? (
        <h3 className="text-center text-dark text-capitalize">
          <Message
            variant={"primary"}
            message={productDetailsSliceData.errorMessage}
          />
        </h3>
      ) : productDetailsSliceData.product._id === params.id ? (
        <>
          <section>
            <Breadcrumb className="productDetailsBreadcrumb">
              <LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </LinkContainer>
              <Breadcrumb.Item linkAs="span">
                {productDetailsSliceData &&
                  productDetailsSliceData.product.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </section>
          <section>
            <Row>
              <Col className="mt-3" md="6">
                <Image
                  src={productDetailsSliceData.product.image}
                  alt={productDetailsSliceData.product.name}
                  className=" rounded"
                  fluid
                />
              </Col>
              <Col className="mt-3">
                <ListGroup as="ul">
                  <ListGroupItem as="li">
                    <h1 className="fs-5 m-0">
                      {productDetailsSliceData.product.name}
                    </h1>
                  </ListGroupItem>
                  <ListGroupItem as="li">
                    <span className="fw-bold">Description</span> :{" "}
                    {productDetailsSliceData.product.description}
                  </ListGroupItem>
                  <ListGroupItem as="li">
                    <ProductRating
                      rating={productDetailsSliceData.product.rating}
                      text={`${productDetailsSliceData.product.numReviews} Reviews`}
                    />
                  </ListGroupItem>
                </ListGroup>
                <ListGroup as="ul" className="mt-2">
                  <ListGroupItem
                    as="li"
                    className=" border-light border-bottom border-bottom-4"
                  >
                    <span className="fw-bold">Price</span> :{" "}
                    {productDetailsSliceData.product.price}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className=" border-light border-bottom border-bottom-4"
                  >
                    {productDetailsSliceData.product.countInStock ? (
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
                  {productDetailsSliceData.product.countInStock > 0 && (
                    <ListGroupItem as="li">
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[
                              ...Array(
                                productDetailsSliceData.product.countInStock
                              ).keys(),
                            ].map((x) => (
                              <option
                                key={x}
                                value={x + 1}
                                style={{ color: "blue" }}
                              >
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem className="text-center">
                    <Button
                      onClick={addToCartHandler}
                      type="button"
                      variant="danger"
                      disabled={
                        productDetailsSliceData.product.countInStock
                          ? false
                          : true
                      }
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3" md="6">
                <h3>Reviews</h3>
                <ListGroup className="reviewList m-0 p-1">
                  {productDetailsSliceData.product.reviews.length ? (
                    productDetailsSliceData.product.reviews.map((review) => (
                      <ListGroupItem key={review._id} className="rounded-3 p-2">
                        <h4 className="m-0">{review.name}</h4>
                        <ProductRating rating={review.rating} text={``} />
                        <p className="m-0">{review.comment}</p>
                        <p className="m-0">
                          <span className="fw-bold">Created at:</span>{" "}
                          {review.createdAt.substring(0, 10)}
                        </p>
                      </ListGroupItem>
                    ))
                  ) : (
                    <Message variant="danger" message="No Reviews Yet" />
                  )}
                </ListGroup>
              </Col>
              <Col className="mt-3">
                <h3 className="text-capitalize">write a review</h3>
                <ListGroup className="m-0 p-1">
                  <ListGroupItem className="p-2">
                    {!userSliceData.isLogIn ? (
                      <div className="text-center text-capitalize">
                        please{" "}
                        <Link
                          to="/login"
                          className="text-dark fw-bold text-decoration-underline"
                        >
                          Login
                        </Link>
                      </div>
                    ) : userReviewed ? (
                      <p className="m-0 p-0 text-capitalize">
                        you're already reviewed this product
                      </p>
                    ) : (
                      <Form
                        onSubmit={(e) => {
                          addReview(e);
                        }}
                      >
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="input"
                            type="number"
                            min="0"
                            max="5"
                            value={rating}
                            onChange={(e) => {
                              setRating(e.target.value);
                            }}
                            required
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            min="15"
                            max="150"
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            required
                          ></Form.Control>
                        </Form.Group>
                        <div className="text-center mt-2">
                          <Button type="submit">Add</Button>
                        </div>
                      </Form>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </section>
        </>
      ) : (
        <Loader />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default ProductDetails;
