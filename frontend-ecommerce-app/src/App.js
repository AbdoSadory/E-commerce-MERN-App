import { Container } from "react-bootstrap";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./screens/NotFound";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import { useSelector } from "react-redux";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import OrderDetails from "./screens/OrderDetails";
import AllUsers from "./screens/adminScreens/AllUsers";
import AllProducts from "./screens/adminScreens/AllProducts";
import UserDetails from "./screens/adminScreens/UserDetails";
import AdminProductDetails from "./screens/adminScreens/AdminProductDetails";
import AllOrders from "./screens/adminScreens/AllOrders";

function App() {
  const userSliceData = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" Component={Home} exact />
              <Route path="/product/:id" Component={ProductDetails} />
              <Route path="/cart/:id?" Component={Cart} />
              {!userSliceData.isLogIn && (
                <Route path="/login" Component={Login} />
              )}
              {!userSliceData.isLogIn && (
                <Route path="/register" Component={Register} />
              )}
              {userSliceData.isLogIn && (
                <Route path="/profile" Component={Profile} />
              )}
              {userSliceData.isLogIn && (
                <Route path="/shipping" Component={Shipping} />
              )}
              {userSliceData.isLogIn && (
                <Route path="/payment" Component={Payment} />
              )}
              {userSliceData.isLogIn && (
                <Route path="/placeorder" Component={PlaceOrder} />
              )}
              {userSliceData.isLogIn && userSliceData.user.isAdmin && (
                <Route path="/admin/users" Component={AllUsers} />
              )}
              {userSliceData.isLogIn && userSliceData.user.isAdmin && (
                <Route path="/admin/user/:id/edit" Component={UserDetails} />
              )}
              {userSliceData.isLogIn && userSliceData.user.isAdmin && (
                <Route path="/admin/products" Component={AllProducts} />
              )}
              {userSliceData.isLogIn && userSliceData.user.isAdmin && (
                <Route
                  path="/admin/product/:id/edit"
                  Component={AdminProductDetails}
                />
              )}
              {userSliceData.isLogIn && userSliceData.user.isAdmin && (
                <Route path="/admin/orders" Component={AllOrders} />
              )}
              {userSliceData.isLogIn && userSliceData.user.isAdmin && (
                <Route
                  path="/admin/order/:id/edit"
                  Component={AdminProductDetails}
                />
              )}
              <Route path="/order/:id" Component={OrderDetails} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
