import { ethers } from 'ethers';

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            document.getElementById('status').innerText = `Verbunden mit Adresse: ${userAddress}`;
            document.getElementById('error').innerText = "";
        } catch (error) {
            document.getElementById('error').innerText = "Fehler bei der Verbindung: " + error.message;
        }
    } else {
        alert('Bitte installieren Sie MetaMask, um die Wallet zu verbinden.');
    }
}

document.getElementById('connectButton').onclick = connectWallet;
