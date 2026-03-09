import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import MiniGamePage from './pages/MiniGamePage';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="d-inline-block align-top">
              <path d="M12 22C12 22 11 16 7 15C3 14 2 10 2 10C2 10 6 11 10 12C10 8 10 3 12 2C14 3 14 8 14 12C18 11 22 10 22 10C22 10 21 14 17 15C13 16 12 22 12 22Z"
                fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V12" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            </svg>{' '}
            EcoBit
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/minigame">MiniGame</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='page'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/minigame" element={<MiniGamePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
