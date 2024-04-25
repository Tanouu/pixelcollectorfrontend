import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../AuthContext';
import config from '../config';

function Collection() {
    const [nfts, setNfts] = useState([]);
    const { authToken, userId } = useContext(AuthContext); // Accéder au token et userId depuis le contexte

    useEffect(() => {
        fetch(`${config.backendUrl}/nft/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Utiliser le token dans la requête
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setNfts(data);
            })
            .catch(error => {
                console.error('There was a problem fetching the NFTs:', error);
            });
    }, [userId, authToken]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6"> {/* Utilisez col-md-6 pour prendre la moitié de la largeur */}
                    <div className="marketplace">
                        <h2>Collection</h2>
                        <div className="row">
                            {nfts.map(nft => (
                                <div key={nft.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="nft-card">
                                        <img src={`/assets/nft/${nft.photo}`} alt={`NFT ${nft.id}`} className="nft-image" />
                                        <div className="nft-info">
                                            <h5>NFT {nft.id}</h5>
                                            <p>Rareté: {nft.rarity}</p>
                                        </div>
                                    </div>
                                </div>
            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;