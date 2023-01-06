import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import LoginScreen from "@screens/LoginScreen";
import SettingsScreen from "@screens/SettingsScreen";

const Stack = createNativeStackNavigator();

const LoginRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <NavigationContainer>
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
                        statusBarStyle: theme.dark ? "light" : "dark",
                        title: t("navigation.loginRouter.settings.title")
                    }}
                    name="settings"
                    component={SettingsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default LoginRouter;
