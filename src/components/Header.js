import React, { useState, useRef } from 'react';
import logo from '../asset/Logo.png';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'; // Assurez-vous que le chemin d'importation est correct

function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const targetLogin = useRef(null);
    const targetRegister = useRef(null);

    return (
        <header className="bg-dark text-white py-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img src={logo} alt="Pixel Collector Logo" className="header-logo img-fluid" style={{maxWidth: "150px"}} />
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Button variant="success" ref={targetRegister} onClick={() => setShowRegister(!showRegister)}>
                            Créer un compte
                        </Button>
                        <Overlay target={targetRegister.current} show={showRegister} placement="bottom" rootClose={true} onHide={() => setShowRegister(false)}>
                            <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '3px', boxShadow: '0 8px 16px rgba(0,0,0,.15)' }}>
                                <RegisterForm />
                            </div>
                        </Overlay>

                        <Button variant="primary" ref={targetLogin} onClick={() => setShowLogin(!showLogin)} className="ms-2">
                            Se connecter
                        </Button>
                        <Overlay target={targetLogin.current} show={showLogin} placement="bottom" rootClose={true} onHide={() => setShowLogin(false)}>
                            <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '3px', boxShadow: '0 8px 16px rgba(0,0,0,.15)' }}>
                                <LoginForm />
                            </div>
                        </Overlay>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
