import React from 'react';

function NFTDetail() {
    // Simulez un NFT sélectionné ou passez-le en props
    const selectedNFT = { name: "NFT 8", rarity: "Peu Commun", price: 90 };

    return (
        <div>
            <h3>Détails</h3>
            <div>Nom : {selectedNFT.name}</div>
            <div>Rareté : {selectedNFT.rarity}</div>
            <div>Prix : {selectedNFT.price}</div>
            {/* Ajoutez ici d'autres détails */}
        </div>
    );
}

export default NFTDetail;
