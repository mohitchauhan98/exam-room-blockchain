import React, { useState } from "react";
import contractAbi from "../../contractAbi.json";
import { BrowserProvider, Contract } from "ethers";
import "./MintNft.css";

const contractAddress = "0xf1cc784f0993ba2ce2359a9359e6b5fcbc4a8d10";

const MintNft = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenURI, setTokenURI] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        setError("Failed to connect wallet.");
      }
    } else {
      setError("MetaMask is not installed.");
    }
  };

  const mintNFT = async () => {
    if (!window.ethereum) {
      setError(
        "MetaMask not found! Please install MetaMask or connect your wallet."
      );
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractAbi, signer);

    try {
      const tx = await contract.safeMint(walletAddress, tokenId, tokenURI);
      await tx.wait();
      setStatus("NFT successfully minted");
      setError("");
    } catch (error) {
      setStatus(`Minting failed: ${error.message}`);
    }
  };

  return (
    <div className="connect-wallet">
      <h2>Mint NFT</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected Wallet: {walletAddress}</p>
          <div className="mint-nft-wallet">
            <input
              className="nft-input"
              type="text"
              placeholder="Enter Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <input
              className="nft-input"
              type="text"
              placeholder="Enter Token URI"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <button onClick={mintNFT}>Mint NFT</button> 
          </div>
        </>
      )}
      {status && <p>{status}</p>}
    </div>
  );
};

export default MintNft;
