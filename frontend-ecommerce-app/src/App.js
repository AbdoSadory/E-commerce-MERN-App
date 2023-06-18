import { Container } from 'react-bootstrap'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './screens/NotFound'
import ProductDetails from './screens/ProductDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" Component={Home} exact />
              <Route path="/product/:id" Component={ProductDetails} />
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
