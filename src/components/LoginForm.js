import React, { useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import config from "../config";

const LoginForm = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const { setAuthToken, setIsLoggedIn, setUserId} = useContext(AuthContext);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${config.backendUrl}/users/login`, {
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
                return response.json(); // Parse the response to a JSON object
            })
            .then(data => {
                console.log(data);
                // Stockez le token et l'ID de l'utilisateur dans le contexte d'authentification
                setAuthToken(data.jwt);
                setIsLoggedIn(true);
                setUserId(data.user.id);
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