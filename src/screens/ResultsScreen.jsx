import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import ResultList from "@components/ResultList";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Text, Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getResults } from "@features/results/resultApi";

const ResultsScreen = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pendingResults = useSelector(state => state.result.pendingResults);
    const results = useSelector(state => state.result.results);
    const error = useSelector(state => state.result.error);
    const loading = useSelector(state => state.result.loading);

    const [isSnackbarVisible, setSnackbarVisible] = useState(false);

    const onRefresh = () => {
        setSnackbarVisible(false);
        dispatch(getResults());
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
                    {!loading &&
                    (pendingResults?.length === 0 || !pendingResults) &&
                    (results?.length === 0 || !results) ? (
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
                        <ResultList loading={loading} />
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
