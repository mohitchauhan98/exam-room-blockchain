import React, { useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import contractAbi from "../../contractAbi.json";

const contractAddress = "0xf1cc784f0993ba2ce2359a9359e6b5fcbc4a8d10";

const UpdateToken = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [newUri, setNewUri] = useState("");
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

  const updateTokenUri = async () => {
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

      const owner = await contract.ownerOf(tokenId);
      if (owner.toLowerCase() !== walletAddress.toLowerCase()) {
        setError("You are not the owner of this token");
        return;
      }

      const tx = await contract.updateTokenUri(tokenId, newUri);
      await tx.wait();
      setStatus("Token URI successfully updated");
    } catch (error) {
      setError(`Update failed : ${error.message}`);
    }
  };
  return (
    <div className="connect-wallet">
      <h2>Update Token URI</h2>
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
              placeholder="Enter New Token URI"
              value={newUri}
              onChange={(e) => setNewUri(e.target.value)}
            />
            <button onClick={updateTokenUri}>Update URI</button>
          </div>
        </>
      )}
      {status && <p>{status}</p>}
    </div>
  );
};

export default UpdateToken;
