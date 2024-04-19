import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>PIXEL COLLECTOR</h1>
            <nav>
                <Link to="/register">Créer un compte</Link>
                <button>Se connecter</button>
            </nav>
        </header>
    );
}

export default Header;
