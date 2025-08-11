import { configureStore } from "@reduxjs/toolkit";
import userIdReducer from "../slice.js/userIdSlice.js";

export const store = configureStore({
    reducer: {
        userIdReducer
    }
})