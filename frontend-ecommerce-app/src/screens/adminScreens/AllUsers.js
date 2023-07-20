import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/slices/adminSlice";
import Loader from "../../components/messages/Loader";
import Message from "../../components/messages/Message";
import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
const AllUsers = () => {
  const userSliceData = useSelector((state) => state.user);
  const adminSliceData = useSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const deleteHandler = (userID) => {
    dispatch(
      deleteUser({ userID: userID, token: userSliceData.user.token })
    ).then((res) => window.location.reload(true));
  };
  useEffect(() => {
    dispatch(
      getUsers({ id: userSliceData.user.id, token: userSliceData.user.token })
    ).then((res) => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : adminSliceData.error ? (
        <Message variant="danger" message={adminSliceData.errorMessage} />
      ) : (
        <section>
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

                <th>email</th>
                <th>admin</th>
                <th>operations</th>
              </tr>
            </thead>
            <tbody>
              {adminSliceData.admin.users &&
              adminSliceData.admin.users.length ? (
                adminSliceData.admin.users.map((user, index) => (
                  <tr key={user._id} className="">
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="lime"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="yellow"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
                          deleteHandler(user._id);
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
                    No Orders Yet
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </section>
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default AllUsers;
