import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        apiAddress: null
    },
    reducers: {
        setApiAddress: (state, action) => {
            state.apiAddress = action.payload;
        },
        clear: state => {
            state.apiAddress = null;
        }
    }
});

export const { setApiAddress, clear } = settingsSlice.actions;
export default settingsSlice.reducer;
