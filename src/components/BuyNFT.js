import config from "../config";


// 1. Function to transfer the NFT
async function transferNFT(nftId, userId, authToken) {
    const response = await fetch(`${config.backendUrl}/sell/buy`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ nftId, userId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Read the response text
    const text = await response.text();
    console.log('Response text:', text);

    // Try to parse the response text as JSON
    let data;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch (error) {
            console.error('Failed to parse response text as JSON', error);
            data = {};
        }
    }

    return data;
}

// 2. Function to delete the sale
async function deleteSale(saleId, authToken) {
    console.log(`Sending DELETE request to ${config.backendUrl}/sell/${saleId}`);
    const response = await fetch(`${config.backendUrl}/sell/${saleId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response has content before parsing it
    const data = response.status !== 204 ? await response.json() : {};
    console.log('Response from server:', data);

    return data;
}

// 3. Function to perform the purchase
export async function buyNFT(nftId, userId, saleId, authToken, nfts) {
    try {
        console.log('Starting NFT purchase...');

        // Log the nftId and the nfts array
        console.log('nftId:', nftId);
        console.log('nfts:', nfts);

        // Check if the user is the owner of the NFT
        const nft = nfts.find(nft => nft.nft.id === nftId);
        if (!nft) {
            throw new Error('NFT not found');
        }
        if (String(nft.nft.owner.id) === String(userId)) { // Compare owner.id with userId
            throw new Error('Vous ne pouvez pas acheter votre NFT');
        }

        // Transfer the NFT
        console.log('Transferring NFT...');
        await transferNFT(nftId, userId, authToken);
        console.log('NFT transferred successfully');

        // Delete the sale
        console.log('Deleting sale...');
        await deleteSale(saleId, authToken);
        console.log('Sale deleted successfully');

        console.log('Purchase successful');
    } catch (error) {
        console.error('There was an error during the NFT purchase', error);
    }
}