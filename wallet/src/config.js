require('dotenv').config();

module.exports = {
    rpcUrl: process.env.RPC_URL,
    privateKey: process.env.PRIVATE_KEY,
    contractAddress: "contract_adresse_des_smart_contracts",  // Adresse des Smart Contracts
    contractABI: [
        // Beispiel-ABI, anpassen an deinen Smart Contract
        "function bookService(uint256 serviceId, uint256 amount) public returns (bool)"
    ]
};
