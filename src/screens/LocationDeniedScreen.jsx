import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";

const LocationDeniedScreen = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <>
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
            </>
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
