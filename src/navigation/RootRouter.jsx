import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppRouter from "@navigation/AppRouter";
import LocationDeniedScreen from "@screens/LocationDeniedScreen";
import LoginRouter from "@navigation/LoginRouter";
import { useSelector } from "react-redux";
import { isTokenStillFresh } from "@utils/jwt";
import { JwtError } from "@utils/errors";

const RootRouter = () => {
    const [isLocationGranted, setIsLocationGranted] = useState();
    const accessToken = useSelector(store => store.auth.accessToken);
    const isOffline = useSelector(store => store.auth.offline);

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (accessToken) {
            try {
                if (isTokenStillFresh(accessToken)) {
                    setIsAuth(true);
                }
            } catch (e) {
                if (e instanceof JwtError) {
                    setIsAuth(false);
                }
            }
        } else {
            setIsAuth(false);
        }
    }, [accessToken]);

    useEffect(() => setIsAuth(isOffline), [isOffline]);

    return (
        <View style={styles.container}>
            {isAuth ? (
                isLocationGranted ? (
                    <AppRouter setIsLocationGranted={setIsLocationGranted} />
                ) : (
                    <LocationDeniedScreen setIsLocationGranted={setIsLocationGranted} />
                )
            ) : (
                <LoginRouter />
            )}
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
