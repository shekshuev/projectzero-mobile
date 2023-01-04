import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
// import AppRouter from "./AppRouter";
import LocationDeniedScreen from "@screens/LocationDeniedScreen";
import LoginScreen from "@screens/LoginScreen";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLocationGranted, setIsLocationGranted] = useState();
    return (
        <View style={styles.container}>
            {isAuth ? (
                isLocationGranted ? (
                    <Text>22222222222</Text>
                ) : (
                    // <AppRouter setIsAuth={setIsAuth} setIsLocationGranted={setIsLocationGranted} />
                    <LocationDeniedScreen setIsLocationGranted={setIsLocationGranted} />
                )
            ) : (
                <LoginScreen setIsAuth={setIsAuth} />
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
