import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SurveyScreen from "@screens/SurveyScreen";
import SurveyInfoScreen from "@screens/SurveyInfoScreen";
import ActiveSurvey from "@screens/ActiveSurvey";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { SURVEYS_ACTIVE, SURVEYS_INFO, SURVEYS_LIST } from "@navigation/routes";
import AppBar from "@components/AppBar";

const Stack = createNativeStackNavigator();

const SurveyRouter = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                header: props => <AppBar {...props} />
            }}>
            <Stack.Screen
                options={{
                    title: t("navigation.surveyRouter.surveys.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.elevation.level2
                }}
                name={SURVEYS_LIST}
                component={SurveyScreen}
            />
            <Stack.Screen
                options={{
                    title: t("navigation.surveyRouter.surveyInfo.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.elevation.level2
                }}
                name={SURVEYS_INFO}
                component={SurveyInfoScreen}
            />
            <Stack.Screen
                options={{
                    title: t("navigation.surveyRouter.activeSurvey.title"),
                    statusBarStyle: theme.dark ? "light" : "dark",
                    statusBarColor: theme.colors.elevation.level2
                }}
                name={SURVEYS_ACTIVE}
                component={ActiveSurvey}
            />
        </Stack.Navigator>
    );
};

export default SurveyRouter;
