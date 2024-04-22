import React, { useState, useEffect } from 'react';

function Marketplace() {
    const [nfts, setNfts] = useState([]); // État pour stocker les données des NFTs

    // Une fonction pour récupérer les NFTs depuis votre backend
    const fetchNFTs = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/sell/all');

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

    console.log(nfts); // Ajoutez cette ligne pour vérifier les données dans votre état

    return (
    <div className="marketplace">
        <h2>MarketPlace</h2>
        <div className="row">
            {nfts.map(item => (
                <div key={item.id} className="col">
                    <div className="nft-card">
                        <img src={`/assets/nft/${item.nft.photo}`} alt={item.nft.id} className="header-logo img-fluid"
                             style={{maxWidth: "150px"}}/>
                        <div className="nft-info">
                            <h3>NFT {item.nft.id}</h3>
                            <p>Rareté: {item.nft.rarity}</p>
                            <p>Prix: {item.prix}💰 €</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default Marketplace;
