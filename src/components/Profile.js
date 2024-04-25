import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import config from '../config';
import '../css/Profile.css';

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
    }, [authToken, userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-card">
            <img src={user.photo ? `/assets/nft/${user.photo}` : '/assets/nft/default-avatar.png'} alt="User"/>
            <h1>Profil</h1>
            <p className="highlight">Nom d'utilisateur: {user.username}</p>
            <p className="highlight">Email: {user.email}</p>
            <p>Date de naissance: {new Date(user.birthDate).toLocaleDateString()}</p>
            <p>Adresse du portefeuille: {user.walletAddress}</p>
            <p>Authentification à deux facteurs activée: {user.twoFactorAuthEnabled ? 'Oui' : 'Non'}</p>
        </div>


    );
}

export default Profile;