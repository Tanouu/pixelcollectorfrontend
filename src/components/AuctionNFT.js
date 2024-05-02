import React, {useState, useEffect, useContext} from 'react';
import { Modal, Button } from 'react-bootstrap';
import config from "../config";
import AuthContext from "../AuthContext";

function AuctionNFT({ selectedNftId, setShowAuctionForm }) {
    const {authToken, userId} = useContext(AuthContext);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startingPrice, setStartingPrice] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowAuctionForm(false);
    };
    const handleShow = () => {
        const date = new Date(); // Get current date and time
        const localISOTime = date.toLocaleString('fr-FR', {timeZone: 'Europe/Paris', hour12: false});
        const formattedStartDate = localISOTime.replace(',', '').replace(/:/g, '-').slice(0, 19);
        const correctFormatStartDate = formattedStartDate.split(' ')[0].split('/').reverse().join('-') + 'T' + formattedStartDate.split(' ')[1].replace(/-/g, ':');
        setStartDate(correctFormatStartDate); // Set the start date to the current date and time
        setShow(true);
    };

    Date.prototype.stdTimezoneOffset = function () {
        const jan = new Date(this.getFullYear(), 0, 1);
        const jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }

    Date.prototype.isDstObserved = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }

    useEffect(() => {
        handleShow();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const auctionDto = {
            nftId: selectedNftId,
            startDate: startDate,
            endDate: endDate,
            startingPrice: startingPrice,
            ownerId: userId
        };

        fetch(`${config.backendUrl}/auctions/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(auctionDto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Auction created:', data);
                handleClose();
            })
            .catch(error => {
                console.error('There was a problem creating the auction:', error);
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className="login-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Mettre en enchère</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>
                                Date de fin:
                                <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)}
                                       className="form-control" required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Prix de départ:
                                <input type="number" value={startingPrice}
                                       onChange={e => setStartingPrice(e.target.value)}
                                       className="form-control" required/>
                            </label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="btn-custom">
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} className="btn-custom">
                        Mettre en enchère
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AuctionNFT;