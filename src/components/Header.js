import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../asset/Logo.png'; // Assurez-vous que le chemin vers l'image est correct

function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img src={logo} alt="Pixel Collector Logo" className="header-logo img-fluid"
                             style={{maxWidth: "150px"}}/>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                    <Link to="/register" className="btn btn-success me-2">Créer un compte</Link>
                        <Link to="/login" className="btn btn-primary">Se connecter</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
