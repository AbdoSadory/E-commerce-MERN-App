import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Message from "../components/messages/Message";
import HeadHelmet from "../components/helmet/HeadHelmet";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSliceData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(userSliceData.isloading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(register({ name, email, password }))
      .then((res) => {
        if (res.payload.isLogIn) {
          navigate("/");
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {}, []);
  return (
    <>
      <HeadHelmet
        title={`Hi! Join Us ❤`}
        desc="You can buy electronics and anythings related to tech and gaming world"
        keywords="electronics, buy, cheap, phones, laptops"
      />
      <section className="formContainer">
        <div>
          <h2 className="text-capitalize text-center mb-3">
            Be One of our world
          </h2>
          {userSliceData.error && (
            <Message variant="danger" message={userSliceData.errorMessage} />
          )}
          <Form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <Form.Group as={Row} className="m-auto" controlId="name">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="m-auto" controlId="email">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="m-auto" controlId="password">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
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
                  "Register"
                )}
              </Button>
            </div>
          </Form>
          <p className="text-capitalize pt-3 text-center">
            already customer ?{" "}
            <Link className="text-danger fw-bold" to="/login">
              log in
            </Link>
          </p>
        </div>
      </section>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Register;
