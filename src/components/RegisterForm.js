import React, { useState } from 'react';

const RegisterForm = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        birthDate: '',
        walletAddress: '',
        twoFactorAuthEnabled: false,
        photo: '',
    });

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setUser({ ...user, [e.target.name]: e.target.checked });
            return;
        }
        setUser({ ...user, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8081/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    // Log the server's error message
                    return response.text().then(text => {
                        throw new Error(`Erreur HTTP ! status: ${response.status}, message: ${text}`);
                    });
                }
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                console.log(data);
                // Affichez un message de succès ou redirigez l'utilisateur
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de l'enregistrement de l'utilisateur", error);
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
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
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

            <input
                name="birthDate"
                value={user.birthDate}
                onChange={handleChange}
                placeholder="Date de naissance"
                type="date"
                required
            />
            <input
                name="walletAddress"
                value={user.walletAddress}
                onChange={handleChange}
                placeholder="Adresse de portefeuille"
                required
            />
            <label>
                <input
                    name="twoFactorAuthEnabled"
                    type="checkbox"
                    checked={user.twoFactorAuthEnabled}
                    onChange={handleChange}
                />
                Authentification à deux facteurs
            </label>
            <input
                name="photo"
                value={user.photo}
                onChange={handleChange}
                placeholder="Photo de profil"
                type="text"
            />
            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default RegisterForm;