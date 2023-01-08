import { createSlice } from "@reduxjs/toolkit";
import { getAccountInfo } from "@features/account/accountApi";

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        account: null,
        loading: false,
        error: null
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        clear: state => {
            state.account = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAccountInfo.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccountInfo.fulfilled, (state, action) => {
                state.account = action.payload?.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAccountInfo.rejected, (state, action) => {
                state.loading = false;
                state.account = null;
                if (action?.error?.name !== "OfflineError") {
                    state.error = action.error?.message || "Unknown error";
                }
            });
    }
});

export const { setAccount, clear } = accountSlice.actions;
export default accountSlice.reducer;
