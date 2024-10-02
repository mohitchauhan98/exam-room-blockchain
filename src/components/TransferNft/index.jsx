import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import React, { useState } from "react";
import contractAbi from "../../contractAbi.json";

const contractAddress = "0xf1cc784f0993ba2ce2359a9359e6b5fcbc4a8d10";

const TransferNft = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

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

  const transferNFT = async () => {
    if (!window.ethereum) {
      setError(
        "MetaMask not found! Please install MetaMask or connect your wallet"
      );
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractAbi, signer);

      //Transfer NFT from 'fromAddress' to 'toAddress'
      const tx = await contract.safeTransferFrom(
        fromAddress || walletAddress,
        toAddress,
        tokenId
      );
      await tx.wait(); // wait for the transaction to be mined
      setStatus("NFT successfully transferred!");
    } catch (error) {
      setError(`Transfer failed : ${error.message}`);
    }
  };
  return (
    <div className="connect-wallet">
      <h2>Transfer NFT</h2>
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
              placeholder="From Address (optional)"
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
            />
            <input
              className="nft-input"
              type="text"
              placeholder="To Address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
            <input
              className="nft-input"
              type="text"
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <button onClick={transferNFT}>Transfer NFT</button>
          </div>
        </>
      )}
      {status && <p>{status}</p>}
    </div>
  );
};

export default TransferNft;
