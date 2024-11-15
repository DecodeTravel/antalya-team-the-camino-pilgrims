require('dotenv').config();
const { ethers } = require("ethers");

// Hole die Umgebungsvariablen
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

// Verbindung zur Columbus Chain über den RPC-Provider
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

// Wallet-Instanz erstellen
const wallet = new ethers.Wallet(privateKey, provider);

// Funktion zum Senden einer Transaktion
async function sendTransaction() {
    try {
        // Definiere die Transaktionsparameter
        const transaction = {
            to: "0x9a220B6A065a5d6cF61eB94bCF7031ab6b902529", // Empfänger-Adre sse
            value: ethers.utils.parseEther("0.01"), // Betrag in Columbus Chain Token
            gasLimit: 21000, //21000, // Gaslimit
            gasPrice: ethers.utils.parseUnits("200", "gwei"), // Gaspreis
        };

        // Transaktion signieren und senden
        const txResponse = await wallet.sendTransaction(transaction);
        console.log("Transaktions-Hash:", txResponse.hash);

        // Auf Bestätigung warten
        const receipt = await txResponse.wait();
        console.log("Transaktion bestätigt im Block", receipt.blockNumber);
    } catch (error) {
        console.error("Fehler beim Senden der Transaktion:", error);
    }
}

// Funktion aufrufen
sendTransaction();
