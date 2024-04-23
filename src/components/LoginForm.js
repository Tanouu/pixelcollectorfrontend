import React, { useState, useContext } from 'react';
import AuthContext from '../AuthContext';

const LoginForm = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const { setAuthToken } = useContext(AuthContext);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://34.155.148.4:8081/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erreur HTTP ! status: ${response.status}, message: ${text}`);
                    });
                }
                return response.text();
            })
            .then(token => {
                console.log(token);
                // Stockez le token dans le contexte d'authentification
                setAuthToken(token);
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la connexion de l'utilisateur", error);
                // Affichez un message d'erreur
            });
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="row mb-3">
                <div className="col">
                    <input
                        className="form-control"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Nom d'utilisateur"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                        type="password"
                        required
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;