import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
    name: "result",
    initialState: {
        results: [],
        loading: false,
        error: null
    },
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload;
        },
        addResult: (state, action) => {
            state.results = [...state.results, action.payload];
        }
    }
});

export const { setResults, addResult } = resultSlice.actions;
export default resultSlice.reducer;
