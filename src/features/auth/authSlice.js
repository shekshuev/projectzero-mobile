import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "@features/auth/authApi";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        loading: false,
        error: null,
        offline: false
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            if (action.payload) {
                state.offline = false;
            }
        },
        setOffline: (state, action) => {
            state.offline = action.payload;
            if (action.payload) {
                state.accessToken = null;
            }
        },
        logout: state => {
            state.offline = false;
            state.accessToken = null;
        },
        clear: state => {
            state.accessToken = null;
            state.loading = false;
            state.error = null;
            state.offline = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signIn.pending, state => {
                state.loading = true;
                state.error = null;
                state.accessToken = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.accessToken = action.payload?.data?.accessToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Unknown error";
            });
    }
});

export const { setAccessToken, setOffline, logout, clear } = authSlice.actions;
export default authSlice.reducer;
