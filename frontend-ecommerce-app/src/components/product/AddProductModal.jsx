import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/slices/adminSlice";
import axios from "axios";

const AddProductModal = (props) => {
  const userSliceData = useSelector((state) => state.user);
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
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      addProduct({
        product: {
          name,
          image,
          description,
          brand,
          category,
          price,
          countInStock,
          rating,
          numReviews,
        },
        token: userSliceData.user.token,
      })
    ).then((res) => {
      if (!res.payload.error) {
        props.onHide();
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
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header className="text-capitalize">
        <Modal.Title id="contained-modal-title-vcenter">
          Add new product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                required
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
                required
                onChange={(e) => {
                  setBrand(e.target.value.toLowerCase());
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
                required
                onChange={(e) => {
                  setCategory(e.target.value.toLowerCase());
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-auto" controlId="description">
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
                required
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
                min="0"
                max="5"
                required
                onChange={(e) => {
                  setRating(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-auto" controlId="numReviews">
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
                min="0"
                required
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
                min="0"
                step="0.01"
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-auto" controlId="countInStock">
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
                min="0"
                required
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
                required
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
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setName("");
            setImage("");
            setUploading(false);
            setBrand("");
            setCategory("");
            setDescription("");
            setRating("");
            setNumReviews("");
            setPrice("");
            setCountInStock("");
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
