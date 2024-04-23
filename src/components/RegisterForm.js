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
        //A changer quand on aura un vrai back
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
                window.location.reload();
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de l'enregistrement de l'utilisateur", error);
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
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
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
            <div className="row mb-3">
                <div className="col">
                    <input
                        className="form-control"
                        name="birthDate"
                        value={user.birthDate}
                        onChange={handleChange}
                        placeholder="Date de naissance"
                        type="date"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input
                        className="form-control"
                        name="walletAddress"
                        value={user.walletAddress}
                        onChange={handleChange}
                        placeholder="Adresse de portefeuille"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            name="twoFactorAuthEnabled"
                            type="checkbox"
                            checked={user.twoFactorAuthEnabled}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">
                            Authentification à deux facteurs
                        </label>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input
                        className="form-control"
                        name="photo"
                        value={user.photo}
                        onChange={handleChange}
                        placeholder="Photo de profil"
                        type="text"
                    />
                </div>
            </div>
            <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>S'inscrire</button>
                    </div>
                </div>
            </form>
    );
};

export default RegisterForm;