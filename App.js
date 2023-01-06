import { StyleSheet, LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RootRouter from "@navigation/RootRouter";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@store/store";
import "react-native-url-polyfill/auto";
import "@localization/i18n";
import { MD3LightTheme } from "react-native-paper";

export default function App() {
    LogBox.ignoreLogs(["Warning: ...", "Looks like"]);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider theme={MD3LightTheme}>
                    <SafeAreaView style={styles.container}>
                        <RootRouter />
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
