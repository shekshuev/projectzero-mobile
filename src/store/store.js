import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/authSlice";
import locationReducer from "@features/location/locationSlice";
import surveyReducer from "@features/survey/surveySlice";
import resultReducer from "@features/results/resultSlice";
import settingsReducer from "@features/settings/settingsSlice";
import accountReducer from "@features/account/accountSlice";
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

const persistedResultReducer = persistReducer(
    {
        key: "result",
        storage: AsyncStorage
    },
    resultReducer
);

const persistedSettingsReducer = persistReducer(
    {
        key: "settings",
        storage: AsyncStorage
    },
    settingsReducer
);

const persistedAccountReducer = persistReducer(
    {
        key: "account",
        storage: AsyncStorage
    },
    accountReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        location: locationReducer,
        survey: persistedSurveyReducer,
        result: persistedResultReducer,
        settings: persistedSettingsReducer,
        account: accountReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);
