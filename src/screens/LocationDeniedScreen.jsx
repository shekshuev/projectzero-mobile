import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, AppState } from "react-native";
import { Button, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";

const LocationDeniedScreen = props => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [serviceEnabled, setServiceEnabled] = useState(false);

    const { t } = useTranslation();
    useEffect(() => {
        const servInterval = setInterval(async () => {
            const serviceEnabled = await Location.hasServicesEnabledAsync();
            if (serviceEnabled) {
                setServiceEnabled(true);
            }
        }, 2000);
        return () => clearInterval(servInterval);
    }, []);

    useEffect(() => {
        Location.getForegroundPermissionsAsync().then(async res => {
            if (res.granted === true && res.status === "granted") {
                if (serviceEnabled) {
                    props.setIsLocationGranted(true);
                }
            } else {
                const result = await Location.requestForegroundPermissionsAsync();
                if (result.granted === true && result.status === "granted") {
                    if (serviceEnabled) {
                        props.setIsLocationGranted(true);
                    }
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
            <Image style={styles.img} source={require("@assets/images/locationDenied.png")} resizeMode="contain" />
            <Text style={styles.text} variant="bodyMedium">
                {t("screens.locationDenied.placeholder")}
            </Text>
            <Button
                icon="cog"
                onPress={() => {
                    Linking.openSettings();
                }}>
                {t("screens.locationDenied.button")}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
        height: "100%",
        justifyContent: "space-around",
        alignItems: "center"
    },
    img: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height * 0.4,
        alignSelf: "center"
    },
    text: {
        textAlign: "center",
        padding: 20
    }
});

export default LocationDeniedScreen;
