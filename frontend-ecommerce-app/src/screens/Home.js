import React, { useEffect } from "react";
import { Row, Col, Pagination, Carousel, Image } from "react-bootstrap";
import Product from "../components/product/Product";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, topProducts } from "../redux/slices/productsSlice";
import { ToastContainer } from "react-toastify";
import Loader from "../components/messages/Loader";
import Message from "../components/messages/Message";
import { Link, useLocation, useParams } from "react-router-dom";
import PaginationSection from "../components/pagination/Pagination";
import { Helmet } from "react-helmet";
import HeadHelmet from "../components/helmet/HeadHelmet";
const Home = () => {
  const productsSliceData = useSelector((state) => state.products);
  let params = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  console.log(location);
  useEffect(() => {
    dispatch(topProducts());
    dispatch(
      allProducts({
        keyword: params.keyword || "",
        page: Number(params.pageNumber) || 1,
      })
    );
  }, [params.keyword, params.pageNumber]);
  return (
    <>
      <HeadHelmet
        title="Welcome to MERNOOO Home"
        desc="You can buy electronics and anythings related to tech and gaming world"
        keywords="electronics, buy, cheap, phones, laptops"
      />
      {(location.pathname === "/" || location.pathname === `/page/1`) && (
        <h1 className="text-center m-0">Welcome to our Project</h1>
      )}
      {(location.pathname === "/" ||
        location.pathname === `/page/${params.pageNumber}`) && (
        <>
          <section>
            <h2 className="mt-2">Top Rated Products</h2>
            <Carousel pause="hover">
              {productsSliceData.topProducts.isloading ? (
                <div className="my-4">
                  <Loader />
                </div>
              ) : productsSliceData.topProducts.error ? (
                <h3 className="text-center text-dark text-capitalize">
                  <div className="my-4">
                    <Message
                      variant={"primary"}
                      message={
                        productsSliceData.topProducts &&
                        productsSliceData.topProducts.errorMessage
                      }
                    />
                  </div>
                </h3>
              ) : productsSliceData.topProducts.products.length ? (
                productsSliceData.topProducts.products.map((product) => (
                  <Carousel.Item key={product._id} className=" my-4">
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.image} alt={product.name} fluid />
                      <Carousel.Caption>
                        <h2>
                          {product.name} ({product.price})
                        </h2>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                ))
              ) : (
                <h3 className="text-center text-light text-capitalize">
                  No Products....
                </h3>
              )}
            </Carousel>
          </section>
        </>
      )}
      <h2 className="mt-2">Latest Products</h2>
      <Row>
        {productsSliceData.isloading ? (
          <Loader />
        ) : productsSliceData.error ? (
          <h3 className="text-center text-dark text-capitalize">
            <Message
              variant={"primary"}
              message={productsSliceData && productsSliceData.errorMessage}
            />
          </h3>
        ) : productsSliceData.products.products.length ? (
          productsSliceData.products.products.map((product) => (
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
            No Products....
          </h3>
        )}
      </Row>
      <PaginationSection
        pages={productsSliceData.products.pages}
        page={productsSliceData.products.page}
        keyword={params.keyword && params.keyword}
      />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Home;
