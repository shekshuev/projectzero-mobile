import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpBuilder } from "@api/http";

export const sendResult = createAsyncThunk("result/sendResult", async ({ result }, { getState }) => {
    const state = getState();
    const http = new HttpBuilder().useDefaultContentType().setAuthorizationToken(state.auth.accessToken).build();
    return http.post("/results", result);
});

export const getResults = createAsyncThunk("result/getResults", async (arg, { getState }) => {
    const state = getState();
    const http = new HttpBuilder().useDefaultContentType().setAuthorizationToken(state.auth.accessToken).build();
    return http.get("/results/account", arg);
});
