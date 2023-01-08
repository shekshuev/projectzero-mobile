import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import AccountScreen from "@screens/AccountScreen";
import { useTheme } from "react-native-paper";
import AppBar from "@components/AppBar";
import { ACCOUNT_MAIN } from "@navigation/routes";

const Stack = createNativeStackNavigator();

const AccountRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                header: props => <AppBar {...props} />
            }}>
            <Stack.Screen
                options={{
                    title: t("navigation.accountRouter.account.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.elevation.level2
                }}
                name={ACCOUNT_MAIN}
                component={AccountScreen}
            />
        </Stack.Navigator>
    );
};

export default AccountRouter;
