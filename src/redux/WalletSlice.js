import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: "",
  status: "",
  error: "",
};

const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWalletSuccess: (state, action) => {
      state.walletAddress = action.payload;
      state.status = "connected";
      state.error = "";
    },
    connectWalletFailure: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    disconnectWallet: (state) => {
      state.walletAddress = "";
      state.status = "disconnected";
    },
  },
});

export const { connectWalletSuccess, connectWalletFailure, disconnectWallet } =
  WalletSlice.actions;
export default WalletSlice.reducer;
