import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Location from "expo-location";

export const getCurrentPosition = createAsyncThunk("location/getCurrentPosition", async () => {
    return Location.getCurrentPositionAsync();
});
