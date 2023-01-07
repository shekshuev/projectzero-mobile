import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import LoginScreen from "@screens/LoginScreen";
import SettingsScreen from "@screens/SettingsScreen";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

const LoginRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: t("navigation.loginRouter.login.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.background,
                    headerShown: false
                }}
                name="login"
                component={LoginScreen}
            />
            <Stack.Screen
                options={{
                    title: t("navigation.loginRouter.settings.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.background,
                    headerStyle: {
                        backgroundColor: theme.colors.background
                    },
                    headerTintColor: theme.colors.onBackground
                }}
                name="settings"
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default LoginRouter;
