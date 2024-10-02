import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  error: "",
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    mintNftSuccess: (state, action) => {
      state.status = "NFT minted successfully";
      state.error = "";
    },
    mintNftFailure: (state, action) => {
      state.error = action.payload;
      state.status = "Minting failed";
    },
    resetNftStatus: (state) => {
      state.status = "";
      state.error = "";
    },
  },
});

export const { mintNftSuccess, mintNftFailure, resetNftStatus } =
  nftSlice.actions;
export default nftSlice.reducer;
