import { Container } from 'react-bootstrap'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <Container>
          <h1>Welcome to our Project</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
