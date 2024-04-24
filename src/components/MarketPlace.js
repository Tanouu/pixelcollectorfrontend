import React, { useState, useEffect } from 'react';
import '../css/Marketplace.css'; // Assurez-vous d'avoir un fichier CSS avec ce nom.
import config from '../config';

function Marketplace() {
    const [nfts, setNfts] = useState([]);

    const fetchNFTs = async () => {
        try {
            const response = await fetch(`${config.backendUrl}/sell/all`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNfts(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des NFTs:', error);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6"> {/* Utilisez col-md-6 pour prendre la moitié de la largeur */}
                    <div className="marketplace">
                        <h2>MarketPlace</h2>
                        <div className="row">
                            {nfts.map(item => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="nft-card">
                                        <img src={`/assets/nft/${item.nft.photo}`} alt={`NFT ${item.nft.id}`} className="nft-image" />
                                        <div className="nft-info">
                                            <h5>NFT {item.nft.id}</h5>
                                            <p>Rareté: {item.nft.rarity}</p>
                                            <p>Prix: {item.prix} €</p>
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

export default Marketplace;
