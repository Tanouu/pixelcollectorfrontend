import React, { useState } from 'react';

const LoginForm = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8081/api/users/login', {
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
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                console.log(data);
                // Stockez les données de l'utilisateur dans l'état global ou dans le stockage local ici
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la connexion de l'utilisateur", error);
                // Affichez un message d'erreur
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                required
            />
            <input
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                type="password"
                required
            />
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;