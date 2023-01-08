import { View, StyleSheet, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRouter from "@navigation/AppRouter";
import LocationDeniedScreen from "@screens/LocationDeniedScreen";
import LoginRouter from "@navigation/LoginRouter";
import AccountRouter from "@navigation/AccountRouter";
import { useTheme } from "react-native-paper";
import { ROOT_APP, ROOT_LOCATION_DENIED, ROOT_LOGIN, ROOT_ACCOUNT } from "@navigation/routes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isTokenStillFresh } from "@utils/jwt";
import * as Location from "expo-location";

const Stack = createNativeStackNavigator();

const RootRouter = () => {
    const theme = useTheme();

    const accessToken = useSelector(store => store.auth.accessToken);
    const isOffline = useSelector(store => store.auth.offline);

    const [isSignedIn, setSignedIn] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    const [serviceEnabled, setServiceEnabled] = useState(false);

    useEffect(() => {
        if (accessToken) {
            setSignedIn(isTokenStillFresh(accessToken));
        } else {
            setSignedIn(isOffline);
        }
    }, [accessToken, isOffline]);

    useEffect(() => {
        const servInterval = setInterval(async () => {
            setServiceEnabled(await Location.hasServicesEnabledAsync());
        }, 2000);
        return () => clearInterval(servInterval);
    }, []);

    useEffect(() => {
        Location.getForegroundPermissionsAsync().then(async res => {
            if (res.granted === true && res.status === "granted") {
                setIsLocationEnabled(serviceEnabled);
            } else {
                const result = await Location.requestForegroundPermissionsAsync();
                if (result.granted === true && result.status === "granted") {
                    setIsLocationEnabled(serviceEnabled);
                }
            }
        });
    }, [appState, serviceEnabled]);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            setAppState(nextAppState);
        });
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator initialRouteName={ROOT_APP}>
                    {!isSignedIn ? (
                        <Stack.Screen
                            options={{
                                statusBarStyle: theme.dark ? "light" : "dark",
                                statusBarColor: theme.colors.background,
                                headerShown: false
                            }}
                            name={ROOT_LOGIN}
                            component={LoginRouter}
                        />
                    ) : isLocationEnabled && serviceEnabled ? (
                        <>
                            <Stack.Screen
                                options={{
                                    statusBarStyle: theme.dark ? "light" : "dark",
                                    statusBarColor: theme.colors.background,
                                    headerShown: false
                                }}
                                name={ROOT_APP}
                                component={AppRouter}
                            />
                            <Stack.Screen
                                options={{
                                    statusBarStyle: theme.dark ? "light" : "dark",
                                    statusBarColor: theme.colors.background,
                                    headerShown: false
                                }}
                                name={ROOT_ACCOUNT}
                                component={AccountRouter}
                            />
                        </>
                    ) : (
                        <Stack.Screen
                            options={{
                                statusBarStyle: theme.dark ? "light" : "dark",
                                statusBarColor: theme.colors.background,
                                headerShown: false
                            }}
                            name={ROOT_LOCATION_DENIED}
                            component={LocationDeniedScreen}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    }
});

export default RootRouter;
