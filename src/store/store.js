import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/authSlice";
import locationReducer from "@features/location/locationSlice";
import surveyReducer from "@features/survey/surveySlice";
import resultReducer from "@features/results/resultSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        location: locationReducer,
        survey: surveyReducer,
        result: resultReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
