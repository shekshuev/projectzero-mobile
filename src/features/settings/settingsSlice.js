import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        // apiAddress: null
        apiAddress: "http://192.168.1.34:3000"
    },
    reducers: {
        setApiAddress: (state, action) => {
            state.apiAddress = action.payload;
        },
        clear: state => {
            // state.apiAddress = null;
            state.apiAddress = "http://192.168.1.34:3000";
        }
    }
});

export const { setApiAddress, clear } = settingsSlice.actions;
export default settingsSlice.reducer;
