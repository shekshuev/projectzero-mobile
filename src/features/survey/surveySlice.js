import { createSlice } from "@reduxjs/toolkit";
import { getAvailableSurveys } from "@features/survey/surveyApi";

export const surveySlice = createSlice({
    name: "survey",
    initialState: {
        surveys: [],
        loading: false,
        error: null,
        lastUpdatedAt: Date.now()
    },
    reducers: {
        setSurveys: (state, action) => {
            state.surveys = action.payload;
        },
        clear: state => {
            state.surveys = [];
            state.loading = false;
            state.error = null;
            state.lastUpdatedAt = Date.now();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAvailableSurveys.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAvailableSurveys.fulfilled, (state, action) => {
                state.surveys = action.payload?.data?.surveys || [];
                state.loading = false;
                state.error = null;
                state.lastUpdateAt = Date.now();
            })
            .addCase(getAvailableSurveys.rejected, (state, action) => {
                state.loading = false;
                if (action?.error?.name !== "OfflineError") {
                    state.error = action.error?.message || "Unknown error";
                }
            });
    }
});

export const { setSurveys, clear } = surveySlice.actions;
export default surveySlice.reducer;
