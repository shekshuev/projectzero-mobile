import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpBuilder } from "@api/http";

export const getAvailableSurveys = createAsyncThunk("survey/getAvailableSurveys", async (arg, { getState }) => {
    const state = getState();
    const http = new HttpBuilder().useDefaultContentType().setAuthorizationToken(state.auth.accessToken).build();
    return http.get("/surveys/available", {
        latitude: state.location.position?.latitude,
        longitude: state.location.position?.longitude
    });
});
