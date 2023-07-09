import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product/Product";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../redux/slices/productsSlice";
import { ToastContainer } from "react-toastify";
import Loader from "../components/messages/Loader";
import Message from "../components/messages/Message";

const Home = () => {
  const productsSliceData = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allProducts());
  }, []);
  return (
    <>
      <h1 className="text-center m-0">Welcome to our Project</h1>
      <h2 className="mt-2">Latest Products</h2>
      <Row className="">
        {productsSliceData.isloading ? (
          <Loader />
        ) : productsSliceData.error ? (
          <h3 className="text-center text-dark text-capitalize">
            <Message
              variant={"primary"}
              message={productsSliceData && productsSliceData.errorMessage}
            />
          </h3>
        ) : productsSliceData.products.length ? (
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
        ) : (
          <h3 className="text-center text-light text-capitalize">
            No Products Yet on server....
          </h3>
        )}
      </Row>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Home;
