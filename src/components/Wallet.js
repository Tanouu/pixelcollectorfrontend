import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function Wallet() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            setIsMetaMaskInstalled(true);
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        } else {
            setIsMetaMaskInstalled(false);
        }
    }, []);

    const connectWallet = async () => {
        if (web3) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccounts(accounts);
            } catch (error) {
                console.error("Erreur lors de la connexion à MetaMask", error);
            }
        }
    };

    return (
        <div>
            {!isMetaMaskInstalled ? (
                <p>Veuillez installer MetaMask pour utiliser cette fonctionnalité.</p>
            ) : (
                <button onClick={connectWallet}>
                    {accounts.length > 0 ? `Connecté: ${accounts[0]}` : 'Connecter Wallet'}
                </button>
            )}
        </div>
    );
}

export default Wallet;
