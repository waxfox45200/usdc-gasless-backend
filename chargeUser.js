require("dotenv").config();
const fs = require("fs");
const { ethers } = require("ethers");
const abi = require("./contractABI.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

async function main() {
  const charges = JSON.parse(fs.readFileSync("charges.json", "utf-8"));

  for (const entry of charges) {
    const { charge, signature } = entry;

    try {
      const tx = await contract.chargeUser(
        charge.user,
        charge.amount,
        charge.nonce,
        charge.deadline,
        signature
      );
      console.log("Charging:", charge.user, "Tx:", tx.hash);
      await tx.wait();
    } catch (err) {
      console.error("Failed to charge:", charge.user, err.message);
    }
  }
}

main();
