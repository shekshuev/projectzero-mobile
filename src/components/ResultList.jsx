import { List, Button, Portal, Dialog, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import PendingResultListItem from "@components/PendingResultListItem";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { setPendingResults } from "@features/results/resultSlice";
import { sendResult } from "@features/results/resultApi";

const ResultList = ({ loading }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const lastUpdatedAt = useSelector(state => state.result.lastUpdateAt);
    const surveys = useSelector(state => state.survey.surveys);
    const pendingResults = useSelector(state =>
        state.result.pendingResults?.map(r => ({
            ...r,
            survey: surveys?.find(s => s.id === r.result.surveyId)
        }))
    );
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

    const sendAgain = () => {
        dispatch(sendResult(result));
        setResult(null);
        closeDialog();
    };

    return (
        <>
            <List.Section>
                <List.Subheader>{lastUpdatedAtFormatted}</List.Subheader>
                {pendingResults?.map((result, i) => (
                    <PendingResultListItem loading={loading} result={result} key={i} onSend={onSend} />
                ))}
            </List.Section>
            <View style={styles.buttonContainer}>
                <Button onPress={onClearQueueButtonClicked}>{t("components.resultList.clear")}</Button>
            </View>
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
