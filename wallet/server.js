const express = require('express');
const { bookService } = require('./src/contract');

const app = express();
const PORT = 3000;

// Route für Buchung einer Leistung
app.get('/book/:serviceId/:amount', async (req, res) => {
    const { serviceId, amount } = req.params;

    try {
        // Betrag in Ether umwandeln, wenn nötig
        const amountInEther = ethers.utils.parseEther(amount);
        const receipt = await bookService(serviceId, amountInEther);
        res.status(200).send(`Buchung erfolgreich: ${receipt.transactionHash}`);
    } catch (error) {
        res.status(500).send(`Fehler bei der Buchung: ${error.message}`);
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
