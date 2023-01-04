import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import ResultsScreen from "@screens/ResultsScreen";

const Stack = createNativeStackNavigator();

const ResultsRouter = () => {
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        title: t("navigation.resultsRouter.results.title")
                    }}
                    name="results"
                    component={ResultsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ResultsRouter;
