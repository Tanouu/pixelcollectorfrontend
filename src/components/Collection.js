import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../AuthContext';
import config from '../config';
import '../css/Collection.css';
import Button from "react-bootstrap/Button";
import SellNFT from "./SellNft";


function Collection() {
    const [nfts, setNfts] = useState([]);
    const [selectedNft, setSelectedNft] = useState(null);
    const { authToken, userId } = useContext(AuthContext);
    const [showSellForm, setShowSellForm] = useState(false);

    useEffect(() => {
        fetch(`${config.backendUrl}/nft/user/${userId}`, {
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
                setNfts(data);
            })
            .catch(error => {
                console.error('There was a problem fetching the NFTs:', error);
            });
    }, [userId, authToken]);


    const handleNftClick = (nft) => {
        setSelectedNft(nft);
    };
    const handleSellClick = () => {
        setShowSellForm(true); // Afficher le formulaire lorsque le bouton est cliqué
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="collection">
                        <h2>Collection</h2>
                        <div className="row">
                            {nfts.length > 0 ? (
                                nfts.map(nft => (
                                    <div key={nft.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                        <div className="nft-card" onClick={() => handleNftClick(nft)}>
                                            <img src={`/assets/nft/${nft.photo}`} alt={`NFT ${nft.id}`} className="nft-image" />
                                            <div className="nft-info">
                                                <h5>NFT {nft.id}</h5>
                                                <p>Rareté: {nft.rarity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p>Acheter un nft sur la marketplace pour commencer !</p>
                                    <a href="/">Aller à la marketplace</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {selectedNft && (
                    <div className="col-md-6">
                        <div className="nft-card nft-card-large">
                            <h2>NFT {selectedNft.id}</h2>
                            <img src={`/assets/nft/${selectedNft.photo}`} alt={`NFT ${selectedNft.id}`} className="nft-image" />
                            <div className="nft-info">
                                <p>Rareté: {selectedNft.rarity}</p>
                                <p>Owner: {selectedNft.owner.username}</p>
                            </div>
                          <div className="d-flex justify-content-between">
                              <Button variant="primary" className="me-2" onClick={handleSellClick}>Mettre en vente</Button>
                                <Button variant="primary" className="me-2">Mettre en enchère</Button>
                            </div>
                            {showSellForm && <SellNFT selectedNftId={selectedNft.id} setShowSellForm={setShowSellForm} />}                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Collection;