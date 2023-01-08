import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import LoginScreen from "@screens/LoginScreen";
import SettingsScreen from "@screens/SettingsScreen";
import { useTheme } from "react-native-paper";
import { LOGIN_MAIN, LOGIN_SETTINGS } from "@navigation/routes";
import AppBar from "@components/AppBar";

const Stack = createNativeStackNavigator();

const LoginRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                header: props => <AppBar backgroundColor={theme.colors.background} {...props} />
            }}>
            <Stack.Screen
                options={{
                    title: t("navigation.loginRouter.login.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.background,
                    headerShown: false
                }}
                name={LOGIN_MAIN}
                component={LoginScreen}
            />
            <Stack.Screen
                options={{
                    title: t("navigation.loginRouter.settings.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.background
                }}
                name={LOGIN_SETTINGS}
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default LoginRouter;
