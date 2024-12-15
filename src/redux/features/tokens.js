import { createSlice } from "@reduxjs/toolkit";

const userToken = createSlice({
  name: "token",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export default userToken.reducer;
export const { setAccessToken } = userToken.actions;
