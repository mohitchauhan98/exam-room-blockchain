import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./WalletSlice";
import nftReducer from "./NftSlice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    nft: nftReducer,
  },
});

export default store;
