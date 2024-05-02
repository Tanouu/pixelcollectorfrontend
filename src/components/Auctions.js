import React, {useState, useEffect} from 'react';
import config from '../config';
import '../css/Auction.css';
import Button from "react-bootstrap/Button";
import AuthContext from "../AuthContext";

function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [countdown, setCountdown] = useState(0); // Ajoutez un état pour le compte à rebours [1
    const {authToken, userId} = React.useContext(AuthContext);
    const [bidAmount, setBidAmount] = useState(0);

    const fetchAuctions = async () => {
        try {
            const response = await fetch(`${config.backendUrl}/auctions/all`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const ongoingAuctions = data.filter(auction => new Date(auction.endDate) > new Date()); // Filtrer les enchères en cours
            setAuctions(ongoingAuctions);
        } catch (error) {
            console.error('Erreur lors de la récupération des enchères:', error);
        }
    };

    useEffect(() => {
        fetchAuctions();
    }, []);

    useEffect(() => {
        if (selectedAuction) {
            const endDate = new Date(selectedAuction.endDate).getTime();
            const intervalId = setInterval(() => {
                const now = new Date().getTime();
                const distance = endDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdown(`${days}J ${hours}H ${minutes}M ${seconds}S`);
            }, 1000);

            return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
        }
    }, [selectedAuction]);

    const handleSelect = (auction) => {
        setSelectedAuction(auction);
    };

    const handleBid = async (auctionId) => {
        const bid = {
            userId: userId, // Remplacez ceci par l'ID de l'utilisateur actuel
            amount: bidAmount, // Remplacez ceci par le montant de l'enchère
            timestamp: new Date().toISOString() // Utilisez la date et l'heure actuelles
        };

        try {
            const response = await fetch(`${config.backendUrl}/auctions/${auctionId}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(bid)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Bid placed:', data);
        } catch (error) {
            console.error('Erreur lors de la création de l\'enchère:', error);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="marketplace">
                        <h2>Enchères</h2>
                        <Button variant="primary" onClick={fetchAuctions}>Mettre à jour les prix</Button> {/* Ajoutez ce bouton */}
                        <div className="row">
                            {auctions.map(item => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="nft-card" onClick={() => handleSelect(item)}>
                                        <img src={`/assets/nft/${item.nft.photo}`} alt={`NFT ${item.nft.id}`} className="nft-image" />
                                        <div className="nft-info">
                                            <h5>NFT {item.nft.id}</h5>
                                            <p>Prix de départ: {item.currentPrice} Matic</p>
                                            <p>Date de fin: {new Date(item.endDate).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedAuction && (
                    <div className="col-md-6">
                        <div className="nft-card nft-card-large">
                            <h2>NFT {selectedAuction.nft.id}</h2>
                            <img src={`/assets/nft/${selectedAuction.nft.photo}`} alt={`NFT ${selectedAuction.nft.id}`} className="nft-image" />
                            <div className="nft-info">
                                <p>Prix de départ: {selectedAuction.currentPrice} Matic</p>
                                <p>Date de début: {new Date(selectedAuction.startDate).toLocaleString()}</p>
                                <p>Date de fin: {new Date(selectedAuction.endDate).toLocaleString()}</p>
                                {countdown && <p>Temps restant: {countdown}</p>}
                            </div>
                            <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} /> {/* Ajoutez un champ de saisie pour le montant de l'enchère */}
                            <Button variant="primary" onClick={() => handleBid(selectedAuction.id)}>Enchérir</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default Auctions;