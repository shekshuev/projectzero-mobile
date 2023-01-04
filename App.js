import { StyleSheet, SafeAreaView, LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import LoginRouter from "@components/LoginRouter.jsx";
import React from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import "react-native-url-polyfill/auto";
import "@localization/i18n";

export default function App() {
    LogBox.ignoreLogs(["Warning: ...", "Looks like"]);
    return (
        <Provider store={store}>
            <PaperProvider>
                <SafeAreaView style={styles.container}>
                    <LoginRouter />
                </SafeAreaView>
            </PaperProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
