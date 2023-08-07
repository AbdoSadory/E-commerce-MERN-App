import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  addPaymentMethod,
  addShippingAddress,
} from "../redux/slices/cartSlice";
import { ToastContainer } from "react-toastify";
import CheckoutSteps from "../components/checkOut/CheckoutSteps";
import Message from "../components/messages/Message";
import HeadHelmet from "../components/helmet/HeadHelmet";

const Payment = () => {
  const cartSliceData = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!cartSliceData.shippingAddress) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <HeadHelmet
        title="Payment"
        desc="You can buy electronics and anythings related to tech and gaming world"
        keywords="electronics, buy, cheap, phones, laptops"
      />
      <section className="formContainer">
        <div>
          <h2 className="text-capitalize text-center mb-3">Payment</h2>
          <CheckoutSteps step1={true} step2={true} step3={true} />
          {cartSliceData.error && (
            <Message variant="danger" message={cartSliceData.errorMessage} />
          )}
          <Form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <Form.Group as={Row} className="m-auto" controlId="country">
              <Form.Label column sm="4">
                Select Method
              </Form.Label>
              <Col sm="8">
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="Paypal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                />
                <Form.Check
                  type="radio"
                  label="Stripe"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <div className="text-center m-auto">
              <Button
                type="submit"
                className="text-capitalize d-inline-block"
                style={{ minWidth: "110px" }}
              >
                {cartSliceData.isloading ? (
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
                  "Continue"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Payment;
