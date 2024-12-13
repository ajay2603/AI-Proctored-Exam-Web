import { configureStore } from "@reduxjs/toolkit";
import userTokenReducer from "./features/tokens"; 
import userReducer from "./features/user"; 

const store = configureStore({
  reducer: {
    userToken: userTokenReducer, 
    user: userReducer,
  },
});


export default store;
