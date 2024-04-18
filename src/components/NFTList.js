
import React from 'react';
import NFTCard from './NFTCard';

function NFTList() {
    // Remplacez ceci par vos données statiques pour le moment
    const nfts = [{ id: 1, name: "NFT 1", price: 100 }];

    return (
        <div>
            {nfts.map(nft => (
                <NFTCard key={nft.id} name={nft.name} price={nft.price} />
            ))}
        </div>
    );
}

export default NFTList;
