import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTranslation } from "react-i18next";
import SurveyRouter from "@navigation/SurveyRouter";
import ResultsRouter from "@navigation/ResultsRouter";
import SettingsRouter from "@navigation/SettingsRouter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { AppState } from "react-native";
import * as Location from "expo-location";
import { getCurrentPosition } from "@features/location/locationApi";
import { getAvailableSurveys } from "@features/survey/surveyApi";
import { getResults } from "@features/results/resultApi";
import { APP_SURVEYS, APP_SETTINGS, APP_RESULTS } from "@navigation/routes";

const Tab = createMaterialBottomTabNavigator();

const AppRouter = () => {
    const { t } = useTranslation();
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
        dispatch(getResults());
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

    return (
        <Tab.Navigator>
            <Tab.Screen
                name={APP_SURVEYS}
                component={SurveyRouter}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? "clipboard-list" : "clipboard-list-outline"}
                                color={color}
                                size={24}
                            />
                        );
                    },
                    tabBarLabel: t("navigation.appRouter.screenTitles.surveys")
                }}
            />
            <Tab.Screen
                name={APP_RESULTS}
                component={ResultsRouter}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? "view-list" : "view-list-outline"}
                                color={color}
                                size={24}
                            />
                        );
                    },
                    tabBarLabel: t("navigation.appRouter.screenTitles.results")
                }}
            />
            <Tab.Screen
                name={APP_SETTINGS}
                component={SettingsRouter}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={24} />
                        );
                    },
                    tabBarLabel: t("navigation.appRouter.screenTitles.settings")
                }}
            />
        </Tab.Navigator>
    );
};

export default AppRouter;
