import { createSlice } from "@reduxjs/toolkit";

const licenceSlice = createSlice({
  name: "licence",
  initialState: {
    allTenants: [], 
  },
  reducers: {
    setAllTenants(state, action) {
      state.allTenants = action.payload; 
    },
  },
});

export const { setAllTenants } = licenceSlice.actions;

export default licenceSlice.reducer;
