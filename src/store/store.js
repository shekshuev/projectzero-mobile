import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/authSlice";
import locationReducer from "@features/location/locationSlice";
import surveyReducer from "@features/survey/surveySlice";
import resultReducer from "@features/results/resultSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistedAuthReducer = persistReducer(
    {
        key: "auth",
        storage: AsyncStorage
    },
    authReducer
);

const persistedSurveyReducer = persistReducer(
    {
        key: "survey",
        storage: AsyncStorage
    },
    surveyReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        location: locationReducer,
        survey: persistedSurveyReducer,
        result: resultReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);
