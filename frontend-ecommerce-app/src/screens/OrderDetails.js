import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Loader from "../components/messages/Loader";
import ErrorMessage from "../components/messages/Message";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, updateOrderToPaid } from "../redux/slices/orderSlice.js";
import EmptyCart from "../components/messages/EmptyCart";
import Message from "../components/messages/Message";
import { updateOrderToDelivered } from "../redux/slices/adminSlice";

const OrderDetails = () => {
  let params = useParams();
  const orderSliceData = useSelector((state) => state.order);
  const userSliceData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(orderSliceData.isloading);
  const [updatingDelivery, setUpdatingDelivery] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateOrderToPay = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(
      updateOrderToPaid({
        orderId: orderSliceData.order._id,
        token: userSliceData.user.token,
      })
    )
      .then((res) => {
        setIsLoading(false);
        window.location.reload(true);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  };
  const updateOrderToDeliveredHandler = (e) => {
    setUpdatingDelivery(true);
    e.preventDefault();
    dispatch(
      updateOrderToDelivered({
        orderId: orderSliceData.order._id,
        token: userSliceData.user.token,
      })
    )
      .then((res) => {
        window.location.reload(true);
        setUpdatingDelivery(false);
      })
      .catch((e) => {
        setUpdatingDelivery(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    if (!orderSliceData.order || orderSliceData.order._id !== params.id) {
      dispatch(
        getOrder({ orderId: params.id, token: userSliceData.user.token })
      ).then((res) => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [params.id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : orderSliceData.error ? (
        <h3 className="text-center text-dark text-capitalize">
          <ErrorMessage
            variant={"primary"}
            message={orderSliceData.errorMessage}
          />
        </h3>
      ) : (
        <>
          <h6 className="mb-3">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </h6>
          <h1>Order ID : {orderSliceData.order._id}</h1>

          {orderSliceData.order.isPaid ? (
            <ErrorMessage
              variant="success"
              message={
                <span className="text-capitalize fw-bold text-dark fs-5">
                  Already Paid
                </span>
              }
            />
          ) : (
            <ErrorMessage
              variant="danger"
              message={
                <span className="text-capitalize fw-bold text-dark fs-5">
                  Not Paid Yet
                </span>
              }
            />
          )}
          {orderSliceData.order.isDelivered ? (
            <Message
              variant="success"
              message={
                <span className="text-capitalize fw-bold text-dark fs-5">
                  Already Delivered
                </span>
              }
            />
          ) : (
            <>
              <Message
                variant="danger"
                message={
                  <span className="text-capitalize fw-bold text-dark fs-5">
                    Not Delivered Yet
                  </span>
                }
              />
              {userSliceData.user.isAdmin && (
                <Button
                  onClick={updateOrderToDeliveredHandler}
                  className="mb-2"
                >
                  {updatingDelivery ? (
                    <Spinner
                      animation="border"
                      variant="warning"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderWidth: "2px",
                        animationDuration: "0.5s",
                      }}
                    ></Spinner>
                  ) : (
                    "Delivered"
                  )}
                </Button>
              )}
            </>
          )}

          <Row>
            <Col md={8}>
              <ListGroup variant="danger">
                <ListGroup.Item className="border-bottom border-secondary">
                  <h2 className="text-dark">Shipping</h2>
                  <p>
                    <span className="text-capitalize fw-bold">
                      full address:{" "}
                    </span>
                    {`${orderSliceData.order.shippingAddress.address}, ${orderSliceData.order.shippingAddress.city}, ${orderSliceData.order.shippingAddress.country}`}
                  </p>
                  <p>
                    <span className="text-capitalize fw-bold">
                      postal code:{" "}
                    </span>
                    {`${orderSliceData.order.shippingAddress.postalCode}`}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item className="border-bottom border-secondary">
                  <h2 className="text-dark">Payment Method</h2>
                  <p>
                    <span className="text-capitalize fw-bold">Method: </span>
                    {orderSliceData.order.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className="text-dark">Order Items</h2>
                  {orderSliceData.order.orderItems.length ? (
                    <ListGroup>
                      {orderSliceData.order.orderItems.map((product) => (
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
                      message={"No Products In The Cart"}
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className="orderSummarySection">
              <Card>
                <ListGroup>
                  <ListGroup.Item className="border-bottom border-secondary">
                    <h2 className="text-center text-dark m-0 p-0">
                      Order Summary
                    </h2>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-bottom border-secondary">
                    <Row>
                      <Col className="fw-bold text-primary">Items Price:</Col>
                      <Col className="text-dark">
                        {orderSliceData.order.itemsPrice} $
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-bottom border-secondary">
                    <Row>
                      <Col className="fw-bold text-primary">Shipping:</Col>
                      <Col className="text-dark">
                        {orderSliceData.order.shippingPrice} $
                      </Col>
                    </Row>
                    <p className="m-0 text-dark text-capitalize">
                      free shipping for products price over than 200$
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-bottom border-secondary">
                    <Row>
                      <Col className="fw-bold  text-primary">Tax:</Col>
                      <Col className="text-dark">
                        {orderSliceData.order.taxPrice} $
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-bottom border-secondary">
                    <Row>
                      <Col className="fw-bold  text-primary">Total Price:</Col>
                      <Col className="text-dark">
                        {orderSliceData.order.totalPrice} $
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-bottom border-secondary text-center">
                    <Button
                      type="button"
                      className="btn-danger"
                      disabled={orderSliceData.order.isPaid ? true : false}
                      onClick={(e) => updateOrderToPay(e)}
                    >
                      {isLoading ? (
                        <Spinner
                          animation="border"
                          variant="warning"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderWidth: "2px",
                            animationDuration: "0.5s",
                          }}
                        ></Spinner>
                      ) : (
                        "Pay"
                      )}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default OrderDetails;
