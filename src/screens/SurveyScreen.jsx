import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import SurveyList from "@components/SurveyList";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableSurveys } from "@features/survey/surveyApi";
import { Avatar, Text, Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { SURVEYS_INFO } from "@navigation/routes";
import { FILE_FORMAT_ERROR } from "@utils/errors";

const SurveyScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const surveys = useSelector(state => state.survey.surveys);
    const error = useSelector(state => state.survey.error);
    const surveyLoading = useSelector(state => state.survey.loading);
    const locationLoading = useSelector(state => state.location.loading);

    const loading = useMemo(() => surveyLoading || locationLoading, [surveyLoading, locationLoading]);

    const [snackbarError, setSnackbarError] = useState();
    const isSnackbarVisible = useMemo(() => snackbarError?.length > 0, [snackbarError]);

    const onRefresh = () => {
        setSnackbarError(null);
        dispatch(getAvailableSurveys());
    };

    const onListItemClicked = surveyId => {
        navigation.navigate(SURVEYS_INFO, { id: surveyId });
    };

    useEffect(() => {
        if (error && error?.length > 0) {
            if (error === FILE_FORMAT_ERROR) {
                setSnackbarError(t("errors.fileFormatError"));
            } else {
                setSnackbarError(error);
            }
        }
    }, [error]);

    return (
        <>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />}>
                    {!loading & (surveys?.length === 0 || !surveys) ? (
                        <View style={styles.empty}>
                            <Avatar.Icon size={100} icon="map-marker" />
                            <Text style={styles.message} variant="headlineSmall">
                                {t("screens.survey.noSurveys")}
                            </Text>
                            <Text style={styles.message} variant="labelSmall">
                                {t("screens.survey.pullDown")}
                            </Text>
                        </View>
                    ) : (
                        <SurveyList onListItemClicked={onListItemClicked} loading={loading} surveys={surveys} />
                    )}
                </ScrollView>
            </View>
            <Snackbar visible={isSnackbarVisible} onDismiss={() => setSnackbarError(null)} duration={4000}>
                {snackbarError}
            </Snackbar>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    scrollView: {
        flexGrow: 1
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        textAlign: "center"
    },
    message: {
        textAlign: "center",
        marginTop: 10
    }
});

export default SurveyScreen;
