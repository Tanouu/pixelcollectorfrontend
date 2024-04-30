import React, { useState, useRef, useEffect } from 'react';
import logo from '../asset/Logo.png';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { Link } from "react-router-dom";
import Web3 from 'web3';
import config from '../config';
import '../css/Header.css';

function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const targetLogin = useRef(null);
    const targetRegister = useRef(null);
    const { setAuthToken, isLoggedIn, setIsLoggedIn, userId, authToken } = useContext(AuthContext);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);


    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        } else {
            alert("Please install MetaMask to use this feature.");
        }
    }, []);

    const handleConnectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            updateBalance(accounts[0]);

            // Mettre à jour le wallet de l'utilisateur dans la base de données
            const response = await fetch(`${config.backendUrl}/users/${userId}/wallet`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(accounts[0]) // Assurez-vous que votre API accepte le nouveau wallet dans le corps de la requête
            });

            if (!response.ok) {
                throw new Error('Failed to update wallet');
            }

            const updatedWallet = await response.text(); // Utiliser response.text() si l'API renvoie une chaîne de caractères
            setAccount(JSON.parse(updatedWallet));

        } catch (error) {
            console.error("Error connecting to MetaMask", error);
        }
    };

    const updateBalance = async (account) => {
        if (web3) {
            const balanceWei = await web3.eth.getBalance(account);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            setBalance(parseFloat(balanceEth).toFixed(7));
        }
    };

    const handleLogout = () => {
        setAuthToken('');
        setIsLoggedIn(false);
        window.location.href = '/';
        localStorage.clear();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Pixel Collector Logo" className="header-logo" style={{ maxWidth: "150px" }} />
                </Navbar.Brand>
                {account && (
                    <Nav.Link className="ms-2 text-light">
                        Balance: {balance} Matic
                    </Nav.Link>
                )}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/game" className="nav-link-hover">Jeu</Nav.Link>
                                <Nav.Link className="nav-link-hover">Enchères</Nav.Link>
                                <Nav.Link as={Link} to="/" className="nav-link-hover">MarketPlace</Nav.Link>
                                <Nav.Link as={Link} to="/collection" className="nav-link-hover">Collection</Nav.Link>
                                <Nav.Link as={Link} to="/profile" className="nav-link-hover">Profil</Nav.Link>
                                <Nav.Link onClick={handleLogout} className="nav-link-hover">
                                    Se déconnecter
                                </Nav.Link>
                                <Button variant="primary" onClick={handleConnectWallet}>
                                    {account ? `Wallet : ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link ref={targetRegister} onClick={() => setShowRegister(!showRegister)} className="nav-link-hover">
                                    Créer un compte
                                </Nav.Link>
                                <Overlay target={targetRegister.current} show={showRegister} placement="bottom" rootClose={true} onHide={() => setShowRegister(false)}>
                                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '3px', boxShadow: '0 8px 16px rgba(0,0,0,.15)' }}>
                                        <RegisterForm />
                                    </div>
                                </Overlay>

                                <Nav.Link ref={targetLogin} onClick={() => setShowLogin(!showLogin)} className="nav-link-hover">
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