import React, { useState } from "react";
import contractAbi from "../../contractAbi.json";
import { BrowserProvider, Contract } from "ethers";
import "./MintNft.css";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWalletFailure,
  connectWalletSuccess,
} from "../../redux/WalletSlice";
import { mintNftFailure, mintNftSuccess } from "../../redux/NftSlice";

const contractAddress = "0xf1cc784f0993ba2ce2359a9359e6b5fcbc4a8d10";

const MintNft = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  const mintStatus = useSelector((state) => state.nft.status);
  const mintError = useSelector((state) => state.nft.error);
  const [tokenId, setTokenId] = useState("");
  const [tokenURI, setTokenURI] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        dispatch(connectWalletSuccess(accounts[0]));
      } catch (error) {
        dispatch(connectWalletFailure("Failed to connect wallet."));
      }
    } else {
      dispatch(connectWalletFailure("MetaMask is not installed."));
    }
  };

  const mintNFT = async () => {
    if (!window.ethereum) {
      dispatch(
        mintNftFailure(
          "MetaMask not found! Please install MetaMask or connect your wallet."
        )
      );
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractAbi, signer);

    try {
      const tx = await contract.safeMint(walletAddress, tokenId, tokenURI);
      await tx.wait();
      dispatch(mintNftSuccess());
      mintError("");
    } catch (error) {
      dispatch(mintNftFailure(`Minting failed: ${error.message}`));
    }
  };

  return (
    <div className="connect-wallet">
      <h2>Mint NFT</h2>
      {mintError && <p style={{ color: "red" }}>{mintError}</p>}
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
      {mintStatus && <p>{mintStatus}</p>}
    </div>
  );
};

export default MintNft;
