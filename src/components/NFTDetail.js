import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import config from '../config';
import AuthContext from '../AuthContext';

function NFTDetails() {
    const [nft, setNft] = useState(null);
    const { id } = useParams();
    const { authToken, userId } = useContext(AuthContext);

    useEffect(() => {
        if (!authToken || !userId) {
            return;
        }

        fetch(`${config.backendUrl}/nft/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setNft(data);
            })
            .catch(error => {
                console.error('There was a problem fetching the NFT:', error);
            });
    }, [id, authToken, userId]);

    if (!authToken || !userId) {
        return <Redirect to="/login" />;
    }

    if (!nft) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>NFT Details</h2>
            <p>Rarity: {nft.rarity}</p>
            <img src={`/assets/nft/${nft.photo}`} alt={`NFT ${nft.id}`} />
            <p>Owner: {nft.owner.username}</p>
            <button>Mettre en vente</button>
            <button>Mettre en enchère</button>
        </div>
    );
}

export default NFTDetails;
