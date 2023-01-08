import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import SettingsScreen from "@screens/SettingsScreen";
import { useTheme } from "react-native-paper";
import AppBar from "@components/AppBar";
import { SETTINGS_MAIN } from "@navigation/routes";

const Stack = createNativeStackNavigator();

const SettingsRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                header: props => <AppBar {...props} />
            }}>
            <Stack.Screen
                options={{
                    title: t("navigation.settingsRouter.settings.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.elevation.level2
                }}
                name={SETTINGS_MAIN}
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingsRouter;
