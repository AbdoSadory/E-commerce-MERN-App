import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserProfile } from "../../redux/slices/adminSlice";
import Loader from "../../components/messages/Loader";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import Message from "../../components/messages/Message";

const UserDetails = () => {
  const userSliceData = useSelector((state) => state.user);
  const adminSliceData = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdminValue, setIsAdminValue] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      updateUserProfile({
        id: adminSliceData.admin.user._id,
        name,
        email,
        isAdmin: isAdminValue,
        token: userSliceData.user.token,
      })
    ).then((res) => {
      setIsLoading(res.payload.isloading);
      setName("");
      setEmail("");
      setNewPassword("");
      res.payload.admin && setIsAdminValue(res.payload.admin.user.isAdmin);
    });
  };
  useEffect(() => {
    dispatch(
      getUser({ userID: params.id, token: userSliceData.user.token })
    ).then((res) => {
      setIsLoading(res.payload.isloading);
      res.payload.admin && setIsAdminValue(res.payload.admin.user.isAdmin);
    });
  }, []);
  return isLoading ? (
    <Loader />
  ) : adminSliceData.error ? (
    <h3 className="text-center text-dark text-capitalize">
      <Message variant={"primary"} message={adminSliceData.errorMessage} />
    </h3>
  ) : (
    adminSliceData.admin.user && (
      <>
        <h6 className="mb-3">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </h6>
        <section className="tabsSection">
          <Tabs
            defaultActiveKey="profile"
            className="mb-3 justify-content-center"
          >
            <Tab eventKey="profile" title="Profile" className="tabSection">
              <ListGroup as="ul" variant="warning">
                <ListGroupItem as="li" className="fw-bold">
                  Name : {adminSliceData.admin.user.name}
                </ListGroupItem>
                <ListGroupItem as="li" className="fw-bold">
                  Email : {adminSliceData.admin.user.email}
                </ListGroupItem>
                <ListGroupItem as="li" className="fw-bold">
                  Admin : {adminSliceData.admin.user.isAdmin ? "YES" : "NO"}
                </ListGroupItem>
              </ListGroup>
            </Tab>
            <Tab eventKey="updateProfile" title="Update Profile">
              {adminSliceData.admin.error && (
                <Message
                  variant="danger"
                  message={adminSliceData.admin.errorMessage}
                />
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
                      className="mb-2"
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
                      className="mb-2"
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
                      className="mb-2"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-auto" controlId="isAdmin">
                  <Col sm="12" className="mb-2">
                    <Form.Check
                      type="checkBox"
                      label="Is Admin"
                      checked={isAdminValue}
                      onChange={(e) => setIsAdminValue(e.target.checked)}
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
                      "Update"
                    )}
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="orders" title="My Orders">
              <Table
                striped
                bordered
                hover
                responsive
                className="ordersTable table-sm text-center text-capitalize"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {adminSliceData.admin.user &&
                  adminSliceData.admin.user.orders.length ? (
                    adminSliceData.admin.user.orders.map((order, index) => (
                      <tr key={order}>
                        <td>{index + 1}</td>
                        <td>{order}</td>
                        <td>
                          <Link
                            to={`/order/${order}`}
                            className="text-decoration-underline"
                          >
                            More
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-capitalize text-center">
                        No Orders Yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </section>
        <ToastContainer autoClose={2000} />
      </>
    )
  );
};

export default UserDetails;
