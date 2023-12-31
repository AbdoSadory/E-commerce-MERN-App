import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import { allProducts } from "../../redux/slices/productsSlice";
import Loader from "../../components/messages/Loader";
import Message from "../../components/messages/Message";
import { Button, Col, Row, Table } from "react-bootstrap";
import { addProduct, deleteProduct } from "../../redux/slices/adminSlice";
import AddProductModal from "../../components/product/AddProductModal.jsx";
import PaginationSection from "../../components/pagination/Pagination";
import { useParams } from "react-router-dom";

const AllProducts = () => {
  const userSliceData = useSelector((state) => state.user);
  const productsSliceData = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  let params = useParams();
  const deleteHandler = (userID) => {
    dispatch(
      deleteProduct({ userID: userID, token: userSliceData.user.token })
    ).then((res) => window.location.reload(true));
  };

  useEffect(() => {
    dispatch(allProducts({ keyword: "", page: params.pageNumber || 1 })).then(
      (res) => {
        setIsLoading(false);
      }
    );
  }, [params.pageNumber]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : productsSliceData.error ? (
        <Message variant="danger" message={productsSliceData.errorMessage} />
      ) : (
        <>
          <section>
            <Row className="mb-2 align-items-center">
              <Col sm="12" md="6">
                <h2 className="m-0">Products</h2>
              </Col>
              <Col className="text-end" sm="12" md="6">
                <Button onClick={() => setModalShow(true)}>
                  + Add Product
                </Button>
              </Col>
            </Row>
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
                  <th>ID</th>
                  <th>name</th>

                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {productsSliceData.products.products.length ? (
                  productsSliceData.products.products.map((product, index) => (
                    <tr key={product._id} className="">
                      <td>{index + 1}</td>
                      <td>{product._id}</td>
                      <td>{product.name}</td>

                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <button className="operationBtn btn btn-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              fill="#fd7e14"
                              viewBox="0 0 512 512"
                            >
                              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                            </svg>
                          </button>
                        </LinkContainer>
                        <button
                          className="operationBtn btn btn-light"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="red"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-capitalize text-center">
                      No Products Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <AddProductModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </section>
          <PaginationSection
            pages={productsSliceData.products.pages}
            page={productsSliceData.products.page}
            keyword={params.keyword && params.keyword}
            isAdmin={true}
          />
        </>
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default AllProducts;
