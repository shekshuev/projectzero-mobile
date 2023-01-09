import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ActivityIndicator, TextInput, Button, Snackbar, Text, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { signIn } from "@features/auth/authApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { setOffline } from "@features/auth/authSlice";
import { LOGIN_SETTINGS } from "@navigation/routes";

const LoginScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme();

    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isSnackbarVisible, setSnackbarVisible] = useState(false);

    const onLoginButtonClicked = () => {
        dispatch(signIn({ userName, password }));
    };

    useEffect(() => {
        if (error && error?.length > 0) {
            setSnackbarVisible(true);
        }
    }, [error]);

    const goToSettings = () => {
        navigation.navigate(LOGIN_SETTINGS);
    };

    const useOffline = () => {
        dispatch(setOffline(true));
    };

    return (
        <>
            <View style={styles.container}>
                {loading ? (
                    <>
                        <View />
                        <ActivityIndicator size="large" animating={true} />
                        <View />
                    </>
                ) : (
                    <>
                        <View />
                        <View>
                            <View style={styles.centered}>
                                <Image style={styles.image} source={require("@assets/images/splash.png")} />
                                <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
                                    PROJECT ZERO
                                </Text>
                                <Text variant="titleMedium" style={{ color: theme.colors.secondary, marginBottom: 20 }}>
                                    mobile
                                </Text>
                            </View>
                            <TextInput
                                mode="flat"
                                value={userName}
                                label={t("screens.login.inputLabels.login")}
                                onChangeText={setUserName}
                                style={{ marginBottom: 10 }}
                            />
                            <TextInput
                                mode="flat"
                                value={password}
                                secureTextEntry={isPasswordVisible}
                                right={
                                    <TextInput.Icon
                                        icon={isPasswordVisible ? "eye" : "eye-off"}
                                        onPressIn={() => {
                                            setPasswordVisible(!isPasswordVisible);
                                            return false;
                                        }}
                                    />
                                }
                                label={t("screens.login.inputLabels.password")}
                                onChangeText={setPassword}
                                style={{ marginBottom: 10 }}
                            />
                            <Button
                                mode="contained"
                                style={styles.loginButton}
                                disabled={!(userName?.length > 0 && password?.length > 0)}
                                onPress={onLoginButtonClicked}>
                                {t("screens.login.loginButton")}
                            </Button>
                            <Button onPress={useOffline}>{t("screens.login.useOffline")}</Button>
                        </View>
                        <View style={styles.bottomRow}>
                            <Button onPress={goToSettings}>
                                <MaterialCommunityIcons name="cog" size={20} color={theme.colors.primary} />
                            </Button>
                        </View>
                    </>
                )}
            </View>
            <Snackbar visible={isSnackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={4000}>
                {error}
            </Snackbar>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        padding: 10
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: "contain"
    },
    centered: {
        alignItems: "center"
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    loginButton: {
        marginBottom: 10
    }
});

export default LoginScreen;
