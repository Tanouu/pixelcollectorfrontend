import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import config from '../config';
import '../css/Profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const { authToken, userId } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${config.backendUrl}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
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

    const enableTwoFactorAuth = () => {
        const updatedUser = {
            ...user,
            twoFactorAuthEnabled: true,
        };

        fetch(`${config.backendUrl}/auth/enable-2fa`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Use .text() instead of .json()
            })
            .then(data => {
                if (data) {
                    setUser({
                        ...user,
                        qrCodeImage: data
                    });
                } else {
                    console.error('No data received');
                }
            })
            .catch(error => console.error('Fetch error: ', error));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-card">
            <img className="profile-picture"
                 src={user.photo ? `/assets/nft/${user.photo}` : '/assets/nft/default-avatar.png'} alt="User"/>
            <h1>Profil</h1>
            <p className="highlight">Nom d'utilisateur: {user.username}</p>
            <p className="highlight">Email: {user.email}</p>
            <p>Date de naissance: {new Date(user.birthDate).toLocaleDateString()}</p>
            <p>Adresse du portefeuille: {user.walletAddress}</p>
            <p>Authentification à deux facteurs activée: {user.twoFactorAuthEnabled ? 'Oui' : 'Non'}</p>
            <button onClick={enableTwoFactorAuth} disabled={user.twoFactorAuthEnabled}>
                Activer l'authentification à deux facteurs
            </button>
            {user.qrCodeImage && (
                <div>
                    <h2>Scan this QR Code with your 2FA App:</h2>
                    <img className="qr-code" src={`data:image/png;base64,${user.qrCodeImage}`} alt="QR Code"/>
                </div>
            )}
        </div>
    );
}

export default Profile;