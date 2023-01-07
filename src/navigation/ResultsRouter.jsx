import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import ResultsScreen from "@screens/ResultsScreen";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

const ResultsRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    title: t("navigation.resultsRouter.results.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.background,
                    headerStyle: {
                        backgroundColor: theme.colors.background
                    },
                    headerTintColor: theme.colors.onBackground
                }}
                name="results"
                component={ResultsScreen}
            />
        </Stack.Navigator>
    );
};

export default ResultsRouter;
