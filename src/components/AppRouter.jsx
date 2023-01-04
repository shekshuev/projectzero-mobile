import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Settings from "./Settings";
import SurveyRouter from "./SurveyRouter";
import Queue from "./Queue";
import { getCoord } from "../api/geo";
import { getSurveys } from "../api/postService";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../redux/location/locationActions";
import { t } from "i18n-js";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import * as Location from "expo-location";

const AppRouter = props => {
    const dispatch = useDispatch();
    const { accessToken, refreshToken } = useSelector(state => state.tokensReducer);
    //состояние для кольца загрузки
    const [loading, setLoading] = useState(true);
    //состояние для json получаемых исследований
    const [surveys, setSurveys] = useState("");
    //общее количество опросов в базе независимо от локации
    const [total, setTotal] = useState(0);
    const Tab = createBottomTabNavigator();
    //для отслеживания выключения локации без сворачивания приложения
    const [GPSEnabled, setGPSEnabled] = useState(true);
    //background/foreground etc
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(async () => {
        const GPSInterval = setInterval(async () => {
            const GPS = await Location.getProviderStatusAsync();
            setGPSEnabled(GPS.gpsAvailable);
        }, 5000);
        const subscription = AppState.addEventListener("change", nextAppState => {
            setAppState(nextAppState);
        });
        return () => {
            subscription.remove();
            clearInterval(GPSInterval);
        };
    }, []);

    useEffect(() => {
        try {
            NetInfo.fetch().then(async state => {
                if (state.isConnected && state.isInternetReachable) {
                    getCoord(props.setIsLocationGranted)
                        .then(
                            async result => {
                                if (Object.keys(result).length) {
                                    await dispatch(setLocation(result));
                                    getSurveys(accessToken, result.coords).then(result => {
                                        setTotal(result.data.total);
                                        AsyncStorage.setItem(
                                            "preloadedSurveysTotal",
                                            JSON.stringify(result.data.total)
                                        );
                                        setSurveys(result.data.items);
                                        AsyncStorage.setItem("preloadedSurveys", JSON.stringify(result.data.items));
                                        setLoading(false);
                                    });
                                } else {
                                    props.setIsLocationGranted(false);
                                }
                            },
                            reject => {
                                props.setIsLocationGranted(false);
                            }
                        )
                        .catch(() => {
                            props.setIsLocationGranted(false);
                        });
                } else {
                    const presavedTotal = JSON.parse(await AsyncStorage.getItem("preloadedSurveysTotal"));
                    const presavedSurveys = JSON.parse(await AsyncStorage.getItem("preloadedSurveys"));
                    setTotal(presavedTotal === null ? 0 : presavedTotal);
                    setSurveys(presavedSurveys === null ? [] : presavedSurveys);
                    setLoading(false);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }, [appState, GPSEnabled]);

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={t("AppRouter.screenTitles.surveys")}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === t("AppRouter.screenTitles.surveys")) {
                            iconName = "help-outline";
                        } else if (route.name === t("AppRouter.screenTitles.queue")) {
                            iconName = "archive-outline";
                        } else if (route.name === t("AppRouter.screenTitles.settings")) {
                            iconName = "settings";
                        }
                        // Возвращает нужную иконку
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "sandybrown",
                    tabBarInactiveTintColor: "gray",
                    unmountOnBlur: true
                })}>
                <Tab.Screen
                    name={t("AppRouter.screenTitles.surveys")}
                    component={() => <SurveyRouter total={total} surveys={surveys} loading={loading} />}
                />
                <Tab.Screen name={t("AppRouter.screenTitles.queue")} component={() => <Queue />} />
                <Tab.Screen
                    name={t("AppRouter.screenTitles.settings")}
                    component={() => <Settings setIsAuth={props.setIsAuth} />}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
