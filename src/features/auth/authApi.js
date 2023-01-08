import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpBuilder } from "@api/http";

export const signIn = createAsyncThunk("auth/signin", async (arg, { getState }) => {
    const state = getState();
    const http = new HttpBuilder().setApiUrl(state.settings.apiAddress).useDefaultContentType().build();
    return http.post("/auth/signin", arg);
});
