import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import SettingsScreen from "@screens/SettingsScreen";

const Stack = createNativeStackNavigator();

const SettingsRouter = () => {
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        title: t("navigation.settingsRouter.settings.title")
                    }}
                    name="settings"
                    component={SettingsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default SettingsRouter;
