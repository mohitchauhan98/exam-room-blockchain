import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ConnectWallet from "./components/ConnectWallet";
import MintNft from "./components/MintNft";
import TransferNft from "./components/TransferNft";
import UpdateToken from "./components/UpdateToken";

function App() {
  return (
    <Router>
      <div className="navbar">
        <div>
          <div className="navbar-box">
            <div>
              <span style={{ color: "white" }}>KRYPTO</span>
            </div>
            <div className="navbar-links">
              <li>
                <Link to="/" className="nav-links">
                  Connect Wallet
                </Link>
              </li>
              <li>
                <Link to="/mint" className="nav-links">
                  Mint NFT
                </Link>
              </li>
              <li>
                <Link to="/transfer" className="nav-links">
                  Transfer NFT
                </Link>
              </li>
              <li>
                <Link to="/update" className="nav-links">
                  Update Token URI
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<ConnectWallet />} />
        <Route path="/mint" element={<MintNft />} />
        <Route path="/transfer" element={<TransferNft />} />
        <Route path="/update" element={<UpdateToken />} />
      </Routes>
    </Router>
  );
}

export default App;
