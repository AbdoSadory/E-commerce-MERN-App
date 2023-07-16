import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/slices/productDetailsSlice";
import Loader from "../../components/messages/Loader";
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import Message from "../../components/messages/Message";
import { updateProduct } from "../../redux/slices/adminSlice";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const AdminProductDetails = () => {
  let params = useParams();
  const userSliceData = useSelector((state) => state.user);
  const productDetailsSliceData = useSelector((state) => state.productDetails);
  const adminSliceData = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [reviews, setReviews] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      updateProduct({
        product: {
          id: params.id,
          name,
          image,
          brand,
          category,
          description,
          rating,
          numReviews,
          price,
          countInStock,
          reviews,
        },
        token: userSliceData.user.token,
      })
    ).then((res) => {
      console.log(res.payload);
      if (!res.payload.error) {
        window.location.reload();
      } else {
        setIsLoading(false);
      }
    });
  };
  const uploadFileHandler = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axios
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImage(res.data);
          setUploading(false);
        });
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(getProductDetails(params.id)).then((res) => {
      setName(res.payload.product.name);
      setImage(res.payload.product.image);
      setBrand(res.payload.product.brand);
      setCategory(res.payload.product.category);
      setDescription(res.payload.product.description);
      setRating(res.payload.product.rating);
      setNumReviews(res.payload.product.numReviews);
      setPrice(res.payload.product.price);
      setCountInStock(res.payload.product.countInStock);
      setReviews(res.payload.product.review);
    });
  }, []);
  return (
    <>
      {productDetailsSliceData.isloading || adminSliceData.isloading ? (
        <Loader />
      ) : productDetailsSliceData.error || adminSliceData.error ? (
        <h3 className="text-center text-dark text-capitalize">
          <Message
            variant={"primary"}
            message={
              productDetailsSliceData.errorMessage ||
              adminSliceData.errorMessage
            }
          />
        </h3>
      ) : productDetailsSliceData.product._id === params.id ? (
        <>
          <h6 className="mb-3">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </h6>
          <section className="tabsSection">
            <Tabs
              defaultActiveKey="product"
              className="mb-3 justify-content-center"
            >
              <Tab eventKey="product" title="Product" className="tabSection">
                <ListGroup as="ul" variant="warning">
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Name : {productDetailsSliceData.product.name}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Image :{" "}
                    <Image
                      style={{ height: "200px", border: "1px solid black" }}
                      src={productDetailsSliceData.product.image}
                      fluid
                      rounded
                    />
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Brand : {productDetailsSliceData.product.brand}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Category : {productDetailsSliceData.product.category}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Description : {productDetailsSliceData.product.description}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Rating : {productDetailsSliceData.product.rating}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Number of Reviews :{" "}
                    {productDetailsSliceData.product.numReviews}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark bg-secondary m-1 rounded"
                  >
                    Price : {productDetailsSliceData.product.price}
                  </ListGroupItem>
                  <ListGroupItem
                    as="li"
                    className="fw-bold text-dark  bg-secondary m-1 rounded"
                  >
                    avialable In Stock :{" "}
                    {productDetailsSliceData.product.countInStock}
                  </ListGroupItem>
                  <ListGroupItem as="li" className="fw-bold text-dark m-1">
                    Reviews:{" "}
                    <ListGroup className="text-center p-2">
                      {productDetailsSliceData.product.reviews.length ? (
                        productDetailsSliceData.product.reviews.map(
                          (review, index) => (
                            <ListGroupItem
                              key={index}
                              as="li"
                              className="fw-bold text-dark"
                            >
                              {review}
                            </ListGroupItem>
                          )
                        )
                      ) : (
                        <>No Reviws</>
                      )}
                    </ListGroup>
                  </ListGroupItem>
                </ListGroup>
              </Tab>
              <Tab eventKey="updateProduct" title="Update Product">
                {productDetailsSliceData.product.error && (
                  <Message
                    variant="danger"
                    message={productDetailsSliceData.product.errorMessage}
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
                  <Form.Group as={Row} className="m-auto" controlId="brand">
                    <Form.Label column sm="2">
                      Brand
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="text"
                        placeholder="Brand"
                        name="brand"
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="m-auto" controlId="category">
                    <Form.Label column sm="2">
                      Category
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="m-auto"
                    controlId="description"
                  >
                    <Form.Label column sm="2">
                      Description
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="m-auto" controlId="rating">
                    <Form.Label column sm="2">
                      Rating
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="number"
                        placeholder="Rating"
                        name="rating"
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="m-auto"
                    controlId="numReviews"
                  >
                    <Form.Label column sm="2">
                      Number of Reviews
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="number"
                        placeholder="Number of Reviews"
                        name="numReviews"
                        value={numReviews}
                        onChange={(e) => {
                          setNumReviews(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="m-auto" controlId="price">
                    <Form.Label column sm="2">
                      Price
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="m-auto"
                    controlId="countInStock"
                  >
                    <Form.Label column sm="2">
                      Avialable In Stock
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="number"
                        placeholder="Avialable In Stock"
                        name="countInStock"
                        value={countInStock}
                        onChange={(e) => {
                          setCountInStock(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="m-auto" controlId="imageURL">
                    <Form.Label column sm="2">
                      Image
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="mb-2"
                        type="text"
                        placeholder="image path"
                        name="imageURL"
                        value={image}
                        onChange={(e) => {
                          setImage(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        uploadFileHandler(e);
                      }}
                      accept="image/*"
                    />
                    {uploading && (
                      <div className="text-center m-1">
                        <Spinner
                          animation="border"
                          variant="warning"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderWidth: "2px",
                            animationDuration: "0.5s",
                          }}
                        />
                      </div>
                    )}
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
            </Tabs>
          </section>
        </>
      ) : (
        <Loader />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default AdminProductDetails;
