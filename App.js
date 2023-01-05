import { StyleSheet, LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginRouter from "@navigation/LoginRouter";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@store/store";
import "react-native-url-polyfill/auto";
import "@localization/i18n";

export default function App() {
    LogBox.ignoreLogs(["Warning: ...", "Looks like"]);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <SafeAreaView style={styles.container}>
                        <LoginRouter />
                    </SafeAreaView>
                </PaperProvider>
            </PersistGate>
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
