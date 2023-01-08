import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpBuilder } from "@api/http";
import { OfflineError } from "@utils/errors";

export const sendResult = createAsyncThunk("result/sendResult", async ({ result }, { getState }) => {
    const state = getState();
    if (state.auth.offline) {
        throw new OfflineError();
    }
    const http = new HttpBuilder()
        .setApiUrl(state.settings.apiAddress)
        .useDefaultContentType()
        .setAuthorizationToken(state.auth.accessToken)
        .build();
    return http.post("/results", result);
});

export const getResults = createAsyncThunk("result/getResults", async (arg, { getState }) => {
    const state = getState();
    if (state.auth.offline) {
        throw new OfflineError();
    }
    const http = new HttpBuilder()
        .setApiUrl(state.settings.apiAddress)
        .useDefaultContentType()
        .setAuthorizationToken(state.auth.accessToken)
        .build();
    return http.get("/results/account", arg);
});
