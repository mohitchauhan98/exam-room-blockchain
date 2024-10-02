import React, { useEffect, useState } from 'react';
import './ConnectWallet.css'

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(typeof window.ethereum !== 'undefined'){
      console.log('MetaMask is installed')
    }else {
      setError('MetaMask is not installed')
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // const provider = new BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        setError('User denied account connection or another issue occurred.');
      }
    } else {
      setError('MetaMask is not installed.');
    }
  };

  return (
    <div className='connect-wallet'>
      <h2>Connect Your Wallet</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WalletConnect;


// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

// // const address = '0x0f4AD83fbc562Fcd61b842999e419C3E16Cd7972';

// const ConnectWallet = () => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [defaultAccount, setDefaultAccount] = useState(null);
//   const [userBalance, setUserBalance] = useState(null);
//   const [connectButton, setConnectButton] = useState("Connect Wallet");

//   const connectWalletHanlder = () => {
//     if (window.ethereum) {
//       // metamask is here
//       window.ethereum
//         .request({ method: "eth_requestAccounts" })
//         .then((result) => {
//           accountChangeHandler(result[0]);
//         });
//     } else {
//       setErrorMessage("Install Metamask");
//     }
//   };

//   const accountChangeHandler = (newAccount) => {
//     setDefaultAccount(newAccount);
//     getUserBalance(newAccount.toString());
//   };

//   const getUserBalance = (address) => {
//     window.ethereum
//       .request({ method: "eth_getBalance", params: [address, "latest"] })
//       .then((balance) => {
//         setUserBalance(ethers.formatEther(balance));
//       });
//   };

//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", accountChangeHandler);
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener("accountsChanged", accountChangeHandler);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <div>
//         <h4>Connecting to metamask</h4>
//         <button onClick={connectWalletHanlder}>Connect Wallet</button>
//         <div>
//           <h3>Address : {defaultAccount}</h3>
//         </div>
//         <div>
//           <h3>Balance : {userBalance}</h3>
//         </div>
//         {errorMessage && <p>{errorMessage}</p>}
//       </div>
//     </>
//   );
// };

// export default ConnectWallet;
