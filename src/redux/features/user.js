import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    name: "",
    email: "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setLogin, setName, setEmail } = userSlice.actions;

export default userSlice.reducer;
