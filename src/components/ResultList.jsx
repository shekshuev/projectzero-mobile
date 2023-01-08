import { List, Button, Portal, Dialog, Text } from "react-native-paper";
import { View, StyleSheet, Share } from "react-native";
import PendingResultListItem from "@components/PendingResultListItem";
import ResultListItem from "@components/ResultListItem";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { setPendingResults } from "@features/results/resultSlice";
import { sendResult } from "@features/results/resultApi";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const ResultList = ({ loading }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const lastUpdatedAt = useSelector(state => state.result.lastUpdateAt);
    const offline = useSelector(state => state.auth.offline);
    const surveys = useSelector(state => state.survey.surveys);
    const pendingResults = useSelector(state =>
        state.result.pendingResults?.map(r => ({
            ...r,
            survey: surveys?.find(s => s.id === r.result.surveyId)
        }))
    );
    const results = useSelector(state => state.result.results);
    const lastUpdatedAtFormatted = useMemo(
        () => t("components.resultList.lastUpdatedAt") + moment(lastUpdatedAt).format("DD.MM.YYYY HH:mm:ss"),
        [lastUpdatedAt]
    );

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [result, setResult] = useState(null);

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const onClearQueueButtonClicked = () => {
        dispatch(setPendingResults([]));
    };

    const onSend = result => {
        if (result.success) {
            setResult(result);
            openDialog();
        } else {
            dispatch(sendResult(result));
        }
    };

    const onShare = async result => {
        if (await Sharing.isAvailableAsync()) {
            const fileUri = `${FileSystem.documentDirectory}${result.id}.json`;
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(result), {
                encoding: FileSystem.EncodingType.UTF8
            });
            await Sharing.shareAsync(fileUri);
            await FileSystem.deleteAsync(fileUri);
        }
    };

    const sendAgain = () => {
        dispatch(sendResult(result));
        setResult(null);
        closeDialog();
    };

    return (
        <>
            {pendingResults?.length > 0 && (
                <>
                    <List.Section>
                        {pendingResults?.map((result, i) => (
                            <PendingResultListItem
                                offline={offline}
                                loading={loading}
                                result={result}
                                key={i}
                                onSend={onSend}
                                onShare={onShare}
                            />
                        ))}
                    </List.Section>
                    <View style={styles.buttonContainer}>
                        <Button disabled={offline} onPress={onClearQueueButtonClicked}>
                            {t("components.resultList.clear")}
                        </Button>
                    </View>
                </>
            )}
            <List.Section>
                <List.Subheader>{lastUpdatedAtFormatted}</List.Subheader>
                {results?.map((result, i) => (
                    <ResultListItem loading={loading} result={result} key={i} />
                ))}
            </List.Section>
            <Portal>
                <Dialog visible={isDialogOpen} onDismiss={closeDialog}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">{t("components.resultList.modal.title")}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={sendAgain}>{t("components.resultList.modal.yes")}</Button>
                        <Button onPress={closeDialog}>{t("components.resultList.modal.no")}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center"
    }
});
export default ResultList;
