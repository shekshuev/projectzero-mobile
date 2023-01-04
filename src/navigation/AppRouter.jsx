import React, { useEffect, useState, useMemo } from "react";
import { BottomNavigation } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { AppState } from "react-native";
import * as Location from "expo-location";
import { getCurrentPosition } from "@features/location/locationApi";
import { getAvailableSurveys } from "@features/survey/surveyApi";
import SurveyRouter from "@navigation/SurveyRouter";
import ResultsRouter from "@navigation/ResultsRouter";
import SettingsRouter from "@navigation/SettingsRouter";

const AppRouter = () => {
    const { t, i18n } = useTranslation();

    const [index, setIndex] = useState(0);
    const routes = useMemo(
        () => [
            {
                key: "survey",
                title: t("navigation.appRouter.screenTitles.surveys"),
                focusedIcon: "clipboard-list",
                unfocusedIcon: "clipboard-list-outline"
            },
            {
                key: "results",
                title: t("navigation.appRouter.screenTitles.results"),
                focusedIcon: "view-list",
                unfocusedIcon: "view-list-outline"
            },
            {
                key: "settings",
                title: t("navigation.appRouter.screenTitles.settings"),
                focusedIcon: "cog",
                unfocusedIcon: "cog-outline"
            }
        ],
        [() => i18n.language]
    );

    const renderScene = BottomNavigation.SceneMap({
        survey: SurveyRouter,
        settings: SettingsRouter,
        results: ResultsRouter
    });

    const dispatch = useDispatch();
    const currentPosition = useSelector(state => state.location.position);

    const [isGpsEnabled, setGpsEnabled] = useState(true);
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const interval = setInterval(async () => {
            const status = await Location.getProviderStatusAsync();
            setGpsEnabled(status.gpsAvailable);
        }, 5000);
        const subscription = AppState.addEventListener("change", nextAppState => {
            setAppState(nextAppState);
        });
        return () => {
            subscription.remove();
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        dispatch(getCurrentPosition());
    }, [appState]);

    useEffect(() => {
        if (currentPosition) {
            NetInfo.fetch().then(async state => {
                if (state.isConnected && state.isInternetReachable) {
                    dispatch(getAvailableSurveys());
                }
            });
        }
    }, [currentPosition]);

    return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default AppRouter;
