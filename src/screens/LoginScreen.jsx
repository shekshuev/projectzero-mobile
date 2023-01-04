import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, TextInput, Button, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { isTokenStillFresh } from "@utils/jwt";
import { JwtError } from "@utils/errors";
import { useTranslation } from "react-i18next";
import { signIn } from "@features/auth/authApi";

const LoginScreen = ({ setIsAuth }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const accessToken = useSelector(state => state.auth.accessToken);
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);

    const [userName, setUserName] = useState("admin");
    const [password, setPassword] = useState("admin");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isSnackbarVisible, setSnackbarVisible] = useState(false);

    const onLoginButtonClicked = () => {
        dispatch(signIn({ userName, password }));
    };

    useEffect(() => {
        if (error?.length > 0) {
            setSnackbarVisible(true);
        }
    }, [error]);

    useEffect(() => {
        try {
            if (isTokenStillFresh(accessToken)) {
                setIsAuth(true);
            }
        } catch (e) {
            if (e instanceof JwtError) {
                setIsAuth(false);
            }
        }
    }, [accessToken]);

    return (
        <>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" animating={true} />
                ) : (
                    <>
                        <TextInput
                            mode="outlined"
                            value={userName}
                            label={t("screens.login.inputLabels.login")}
                            onChangeText={setUserName}
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            mode="outlined"
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
                            disabled={!(userName?.length > 0 && password?.length > 0)}
                            onPress={onLoginButtonClicked}>
                            {t("screens.login.loginButton")}
                        </Button>
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
        justifyContent: "center",
        padding: 10
    }
});

export default LoginScreen;
