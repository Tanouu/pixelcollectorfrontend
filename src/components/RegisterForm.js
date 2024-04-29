import React, { useState } from 'react';
import config from '../config';

const RegisterForm = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        birthDate: '',
        walletAddress: '',
        twoFactorAuthEnabled: false,
        photo: 'Rare2.png',
    });

    const [emailError, setEmailError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [birthDateTooOldError, setBirthDateTooOldError] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setUser({ ...user, [e.target.name]: e.target.checked });
            return;
        }
        setUser({ ...user, [e.target.name]: e.target.value });

        // Réinitialisez birthDateTooOldError à false chaque fois que l'utilisateur change la date de naissance
        if (e.target.name === 'birthDate') {
            setBirthDateTooOldError(false);
        }
    };

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateBirthDate(birthDate) {
    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const m = currentDate.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDateObj.getDate())) {
        age--;
    }
    // Vérifie si l'utilisateur a au moins 18 ans
    if (age < 18) {
        setBirthDateError(true);
        return false;
    }
    // Vérifie si la date de naissance est plus récente que l'année 1900
    if (birthDateObj.getFullYear() < 1900) {
        setBirthDateTooOldError(true);
        return false;
    }
    setBirthDateError(false);
    setBirthDateTooOldError(false);
    return true;
}

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(user.email)) {
            setEmailError(true);
            return;
        }

        if (!validateBirthDate(user.birthDate)) {
            setBirthDateError(true);
            return;
        }

        setEmailError(false);
        setBirthDateError(false);

        fetch(`${config.backendUrl}/users/register`, {
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
                setRegistrationSuccess(true);
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
                    <div className={`form-group ${emailError ? 'has-danger' : ''}`}>
                        <input
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Email"
                            type="email"
                            required
                        />
                        {emailError && <div className="invalid-feedback">
                            Veuillez entrer une adresse email valide.
                        </div>}
                    </div>
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
                    <div
                        className={`form-group ${birthDateError ? 'has-danger' : ''} ${birthDateTooOldError ? 'has-danger' : ''}`}>
                        <input
                            className={`form-control ${birthDateError ? 'is-invalid' : ''} ${birthDateTooOldError ? 'is-invalid' : ''}`}
                            name="birthDate"
                            value={user.birthDate}
                            onChange={handleChange}
                            placeholder="Date de naissance"
                            type="date"
                            required
                        />
                        {birthDateTooOldError && <div className="invalid-feedback d-block">
                            Entrer une date de naissance valide.
                        </div>}
                        {!birthDateTooOldError && birthDateError && <div className="invalid-feedback d-block">
                            Vous devez avoir au moins 18 ans.
                        </div>}
                    </div>
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
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>S'inscrire</button>
                    {registrationSuccess && <span style={{marginLeft: '10px'}} className="text-success">Inscription réussie !</span>}
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;