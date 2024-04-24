import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import config from '../config';

function Profile() {
    const [user, setUser] = useState(null);
    const { authToken, userId } = useContext(AuthContext); // Accéder au token depuis le contexte

    useEffect(() => {
        fetch(`${config.backendUrl}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Utiliser le token dans la requête
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setUser(data);
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error('Fetch error: ', error));
    }, [authToken]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profil</h1>
            <p>Nom d'utilisateur: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Date de naissance: {user.birthDate}</p>
            <p>Adresse du portefeuille: {user.walletAddress}</p>
            <p>Authentification à deux facteurs activée: {user.twoFactorAuthEnabled ? 'Oui' : 'Non'}</p>
            <p>Photo: {user.photo}</p>
        </div>
    );
}

export default Profile;