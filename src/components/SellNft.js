import React, {useState, useEffect, useContext} from 'react';
import { Modal, Button } from 'react-bootstrap';
import config from "../config";
import AuthContext from "../AuthContext";

function SellNFT({ selectedNftId, setShowSellForm }) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [nftId, setNftId] = useState(selectedNftId);
    const [price, setPrice] = useState('');
    const [saleDate] = useState(formattedDate);
    const [buyDate, setBuyDate] = useState('');
    const [show, setShow] = useState(false);
    const{authToken} = useContext(AuthContext);
    const handleClose = () => {
        setShow(false);
        setShowSellForm(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        setNftId(selectedNftId);
        handleShow();
    }, [selectedNftId]);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const date = new Date(); // Get current date and time
        const timezoneOffset = date.getTimezoneOffset() * 60000; // Get timezone offset in milliseconds
        const franceTimeOffset = 120 * 60000; // France is UTC+1 in standard time
        const localISOTime = (new Date(date - timezoneOffset + franceTimeOffset)).toISOString().slice(0, -1);
        const formattedSaleDate = localISOTime.slice(0, 19);


        const data = {
            nft: {
                id: nftId,
            },
            prix: price,
            dateVente: formattedSaleDate,
            dateBuy: buyDate
        };

        const response = await fetch(`${config.backendUrl}/sell/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = response.status === 204 ? {} : await response.json();
        console.log('Success:', responseData);
        console.log(data)
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Vendre NFT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" value={nftId} />
                        <label>
                            Price:
                            <input type="text" value={price} onChange={e => setPrice(e.target.value)}/>
                        </label>
                        <label>
                            Sale Date:
                            <input type="date" value={saleDate} readOnly/>
                        </label>
                        <label>
                            Buy Date:
                            <input type="date" value={buyDate} onChange={e => setBuyDate(e.target.value)}/>
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Vendre
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SellNFT;