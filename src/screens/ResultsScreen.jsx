import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import SurveyList from "@components/SurveyList";
import { useSelector } from "react-redux";
import { Avatar, Text, Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const ResultsScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const results = useSelector(store => store.result.result);
    const error = useSelector(store => store.result.error);
    const loading = useSelector(store => store.result.loading);

    const [isSnackbarVisible, setSnackbarVisible] = useState(false);

    const onListItemClicked = surveyId => {
        // navigation.navigate("surveyInfo", { id: surveyId });
    };

    const onRefresh = () => {
        setSnackbarVisible(false);
    };

    useEffect(() => {
        if (error?.length > 0) {
            setSnackbarVisible(true);
        }
    }, [error]);

    return (
        <>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />}>
                    {!loading & (results?.length === 0 || !results) ? (
                        <View style={styles.empty}>
                            <Avatar.Icon size={100} icon="database" />
                            <Text style={styles.message} variant="headlineSmall">
                                {t("screens.results.noResults")}
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
            <Snackbar visible={isSnackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={4000}>
                {error}
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

export default ResultsScreen;
