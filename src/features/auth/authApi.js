import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpBuilder } from "@api/http";

export const signIn = createAsyncThunk("auth/signin", async arg => {
    const http = new HttpBuilder().useDefaultContentType().build();
    return http.post("/auth/signin", arg);
});
