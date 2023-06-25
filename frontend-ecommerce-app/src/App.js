import { Container } from 'react-bootstrap'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './screens/NotFound'
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import { useSelector } from 'react-redux'

function App() {
  const userSliceData = useSelector((state) => state.user)
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" Component={Home} exact />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/product/:id" Component={ProductDetails} />
              <Route path="/cart/:id?" Component={Cart} />
              {userSliceData.isLogIn && (
                <Route path="/profile" Component={Profile} />
              )}
              <Route path="*" Component={NotFound} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
