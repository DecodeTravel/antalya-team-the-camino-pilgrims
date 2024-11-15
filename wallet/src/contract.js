const { ethers } = require("ethers");
const config = require("./config");

// Provider und Wallet einrichten
const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const wallet = new ethers.Wallet(config.privateKey, provider);

// Contract-Instanz erstellen
const contract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);

// Buchungsfunktion definieren
async function bookService(serviceId, amount) {
    try {
        const tx = await contract.bookService(serviceId, amount);
        console.log("Buchung in Bearbeitung mit Transaktions-Hash:", tx.hash);

        // Warten auf die Bestätigung
        const receipt = await tx.wait();
        console.log("Buchung bestätigt im Block:", receipt.blockNumber);
        return receipt;
    } catch (error) {
        console.error("Fehler bei der Buchung:", error);
        throw error;
    }
}

// Exportiere die Funktion, um sie woanders im Projekt zu verwenden
module.exports = { bookService };
