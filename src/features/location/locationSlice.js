import { createSlice } from "@reduxjs/toolkit";
import { getCurrentPosition } from "@features/location/locationApi";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        position: null,
        loading: false,
        error: null
    },
    reducers: {
        setCurrentPosition: (state, action) => {
            state.position = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCurrentPosition.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentPosition.fulfilled, (state, action) => {
                state.position = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getCurrentPosition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Unknown error";
                state.position = null;
            });
    }
});

export const { setCurrentPosition } = locationSlice.actions;
export default locationSlice.reducer;
