import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpBuilder } from "@api/http";
import { OfflineError } from "@utils/errors";

export const getAvailableSurveys = createAsyncThunk("survey/getAvailableSurveys", async (arg, { getState }) => {
    const state = getState();
    if (state.auth.offline) {
        throw new OfflineError();
    }
    const http = new HttpBuilder()
        .setApiUrl(state.settings.apiAddress)
        .useDefaultContentType()
        .setAuthorizationToken(state.auth.accessToken)
        .build();
    return http.get("/surveys/available", {
        latitude: state.location.position?.latitude,
        longitude: state.location.position?.longitude
    });
});
