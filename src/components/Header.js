import React, { useState, useRef } from 'react';
import logo from '../asset/Logo.png';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { Link } from "react-router-dom";

function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const targetLogin = useRef(null);
    const targetRegister = useRef(null);
    const { setAuthToken, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        setAuthToken('');
        setIsLoggedIn(false);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="Pixel Collector Logo" className="header-logo" style={{ maxWidth: "150px" }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link>Jouer</Nav.Link>
                                <Nav.Link>Enchères</Nav.Link>
                                <Nav.Link as={Link} to="/">MarketPlace</Nav.Link>
                                <Nav.Link as={Link} to="/collection">Collection</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profil</Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>Se déconnecter</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link ref={targetRegister} onClick={() => setShowRegister(!showRegister)}>
                                    Créer un compte
                                </Nav.Link>
                                <Overlay target={targetRegister.current} show={showRegister} placement="bottom" rootClose={true} onHide={() => setShowRegister(false)}>
                                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '3px', boxShadow: '0 8px 16px rgba(0,0,0,.15)' }}>
                                        <RegisterForm />
                                    </div>
                                </Overlay>

                                <Nav.Link ref={targetLogin} onClick={() => setShowLogin(!showLogin)}>
                                    Se connecter
                                </Nav.Link>
                                <Overlay target={targetLogin.current} show={showLogin} placement="bottom" rootClose={true} onHide={() => setShowLogin(false)}>
                                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '3px', boxShadow: '0 8px 16px rgba(0,0,0,.15)' }}>
                                        <LoginForm />
                                    </div>
                                </Overlay>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
