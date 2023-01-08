import { createSlice } from "@reduxjs/toolkit";
import { sendResult, getResults } from "@features/results/resultApi";
import "react-native-get-random-values";
import { v4 } from "uuid";

export const resultSlice = createSlice({
    name: "result",
    initialState: {
        pendingResults: [],
        results: [],
        loading: false,
        error: null,
        lastUpdatedAt: Date.now(),
        currentSendingId: null
    },
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload;
        },
        addResult: (state, action) => {
            state.results = [...state.results, action.payload];
        },
        setPendingResults: (state, action) => {
            state.pendingResults = action.payload;
        },
        addPendingResult: (state, action) => {
            state.pendingResults = [
                ...state.pendingResults,
                {
                    result: action.payload,
                    loading: false,
                    error: null,
                    success: false,
                    lastUploadTry: null,
                    createdAt: new Date(),
                    id: v4()
                }
            ];
        },
        clear: state => {
            state.pendingResults = [];
            state.results = [];
            state.loading = false;
            state.error = false;
            state.lastUpdatedAt = Date.now();
            state.currentSendingId = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(sendResult.pending, (state, action) => {
                state.currentSendingId = action.meta.arg.id;
                state.pendingResults = state.pendingResults.map(pr => {
                    if (pr.id === state.currentSendingId) {
                        return {
                            ...pr,
                            loading: true
                        };
                    } else {
                        return pr;
                    }
                });
                state.error = null;
                state.accessToken = null;
            })
            .addCase(sendResult.fulfilled, (state, action) => {
                state.pendingResults = state.pendingResults.map(pr => {
                    if (pr.id === state.currentSendingId) {
                        return {
                            ...pr,
                            loading: false,
                            success: true,
                            error: null
                        };
                    } else {
                        return pr;
                    }
                });
                state.results = [...state.results, action.payload.data];
                state.currentSendingId = null;
                state.error = null;
                state.lastUpdateAt = Date.now();
            })
            .addCase(sendResult.rejected, (state, action) => {
                state.currentSendingId = null;
                state.pendingResults = state.pendingResults.map(pr => {
                    if (pr.id === state.currentSendingId) {
                        return {
                            ...pr,
                            loading: false,
                            error: action.error?.message || "Unknown error"
                        };
                    } else {
                        return pr;
                    }
                });
                state.error = action.error?.message || "Unknown error";
            })
            .addCase(getResults.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getResults.fulfilled, (state, action) => {
                state.results = action.payload?.data?.results || [];
                state.loading = false;
                state.error = null;
                state.lastUpdateAt = Date.now();
            })
            .addCase(getResults.rejected, (state, action) => {
                state.loading = false;
                if (action?.error?.name !== "OfflineError") {
                    state.error = action.error?.message || "Unknown error";
                }
            });
    }
});

export const { setResults, addResult, setPendingResults, addPendingResult, clear } = resultSlice.actions;
export default resultSlice.reducer;
