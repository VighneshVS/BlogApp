import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
}

export const userIdSlice = createSlice({
    name: "userId",
    initialState,
    reducers: {
        setUserID: (state, action) => state.userId = action.payload,
    }})

export const { setUserID } = userIdSlice.actions;  
export default userIdSlice.reducer;