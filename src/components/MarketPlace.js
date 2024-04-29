import React, {useState, useEffect, useContext} from 'react';
import '../css/Marketplace.css'; // Assurez-vous d'avoir un fichier CSS avec ce nom.
import config from '../config';
import Button from "react-bootstrap/Button";
import AuthContext from "../AuthContext";
import {buyNFT} from "./BuyNFT";

function Marketplace() {
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState(null);
    const {isLoggedIn} = React.useContext(AuthContext);
    const{authToken, userId} = useContext(AuthContext);

    const handleBuy = async (nftId, saleId) => {
        try {
            await buyNFT(nftId, userId, saleId, authToken, nfts); // Appellez la fonction buyNFT avec les ID appropriés et le token d'authentification
            fetchNFTs(); // Rechargez les NFTs après l'achat
        } catch (error) {
            console.error('Erreur lors de l\'achat du NFT:', error);
        }
    };

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

    const handleSelect = (nft) => {
        setSelectedNft(nft); // Mettez à jour l'état de l'élément NFT sélectionné lorsque le bouton "Sélectionner" est cliqué.
    };

    console.log(selectedNft);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="marketplace">
                        <h2>MarketPlace</h2>
                        <div className="row">
                            {nfts.map(item => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="nft-card" onClick={() => handleSelect(item)}>
                                        <img src={`/assets/nft/${item.nft.photo}`} alt={`NFT ${item.nft.id}`} className="nft-image" />
                                        <div className="nft-info">
                                            <h5>NFT {item.nft.id}</h5>
                                            <p>Rareté: {item.nft.rarity}</p>
                                            <p>Prix: {item.prix} Matic</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedNft && (
                    <div className="col-md-6">
                        <div className="nft-card nft-card-large">
                            <h2>NFT {selectedNft.nft.id}</h2>
                            <img src={`/assets/nft/${selectedNft.nft.photo}`} alt={`NFT ${selectedNft.id}`} className="nft-image" />
                            <div className="nft-info">
                                <p>Rareté: {selectedNft.nft.rarity}</p>
                                <p>Prix: {selectedNft.prix} €</p>
                                <p>Owner: {selectedNft.nft.owner.username}</p>

                            </div>
                            {isLoggedIn && (
                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" className="me-2" onClick={() => handleBuy(selectedNft.nft.id, selectedNft.id)}>Acheter</Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Marketplace;
