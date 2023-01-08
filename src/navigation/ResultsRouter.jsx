import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import ResultsScreen from "@screens/ResultsScreen";
import { useTheme } from "react-native-paper";
import AppBar from "@components/AppBar";
import { RESULTS_LIST } from "@navigation/routes";

const Stack = createNativeStackNavigator();

const ResultsRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                header: props => <AppBar {...props} />
            }}>
            <Stack.Screen
                options={{
                    title: t("navigation.resultsRouter.results.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.elevation.level2
                }}
                name={RESULTS_LIST}
                component={ResultsScreen}
            />
        </Stack.Navigator>
    );
};

export default ResultsRouter;
