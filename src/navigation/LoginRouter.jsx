import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppRouter from "@navigation/AppRouter";
import LocationDeniedScreen from "@screens/LocationDeniedScreen";
import LoginScreen from "@screens/LoginScreen";
import { useSelector } from "react-redux";
import { isTokenStillFresh } from "@utils/jwt";
import { JwtError } from "@utils/errors";

const LoginRouter = () => {
    const [isLocationGranted, setIsLocationGranted] = useState();
    const accessToken = useSelector(store => store.auth.accessToken);

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        console.log(accessToken);
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
    return (
        <View style={styles.container}>
            {isAuth ? (
                isLocationGranted ? (
                    <AppRouter setIsLocationGranted={setIsLocationGranted} />
                ) : (
                    <LocationDeniedScreen setIsLocationGranted={setIsLocationGranted} />
                )
            ) : (
                <LoginScreen />
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

export default LoginRouter;
