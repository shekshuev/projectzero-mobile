import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SurveyScreen from "@screens/SurveyScreen";
import { useTranslation } from "react-i18next";

const ActiveSurvey = () => (
    <View>
        <Text>as12312312dasd</Text>
    </View>
);

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
                        title: t("navigation.surveyRouter.activeSurvey.title")
                    }}
                    name="activeSurvey"
                    component={ActiveSurvey}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
});

export default SurveyRouter;
