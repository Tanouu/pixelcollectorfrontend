
import React from 'react';

function NFTCard({ name, price }) {
    return (
        <div>
            <div>{name}</div>
            <div>{price}</div>
            {/* Ajoutez ici d'autres détails comme l'image, la rareté, etc. */}
        </div>
    );
}

export default NFTCard;
