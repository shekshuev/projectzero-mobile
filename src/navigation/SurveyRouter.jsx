import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SurveyScreen from "@screens/SurveyScreen";
import SurveyInfoScreen from "@screens/SurveyInfoScreen";
import ActiveSurvey from "@screens/ActiveSurvey";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

const SurveyRouter = () => {
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        title: t("navigation.surveyRouter.surveys.title")
                    }}
                    name="surveys"
                    component={SurveyScreen}
                />
                <Stack.Screen
                    options={{
                        title: t("navigation.surveyRouter.surveyInfo.title")
                    }}
                    name="surveyInfo"
                    component={SurveyInfoScreen}
                />
                <Stack.Screen
                    options={{
                        title: t("navigation.surveyRouter.activeSurvey.title")
                    }}
                    name="activeSurvey"
                    component={ActiveSurvey}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default SurveyRouter;
