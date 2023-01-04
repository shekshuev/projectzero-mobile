import { createSlice } from "@reduxjs/toolkit";
import { getAvailableSurveys } from "@features/survey/surveyApi";

export const surveySlice = createSlice({
    name: "survey",
    initialState: {
        surveys: null,
        loading: false,
        error: null
    },
    reducers: {
        setSurveys: (state, action) => {
            state.surveys = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAvailableSurveys.pending, state => {
                state.loading = true;
                state.error = null;
                state.accessToken = null;
            })
            .addCase(getAvailableSurveys.fulfilled, (state, action) => {
                state.surveys = action.payload?.data?.surveys || [];
                state.loading = false;
                state.error = null;
            })
            .addCase(getAvailableSurveys.rejected, (state, action) => {
                state.loading = false;
                state.surveys = [];
                state.error = action.error?.message || "Unknown error";
            });
    }
});

export const { setSurveys } = surveySlice.actions;
export default surveySlice.reducer;
