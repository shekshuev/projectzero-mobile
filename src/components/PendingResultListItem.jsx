import { useTranslation } from "react-i18next";
import { List, ActivityIndicator, Button, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { useTheme } from "react-native-paper";

const PendingResultListItem = ({ result, loading, onSend, ...props }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const onSendButtonClicked = () => {
        onSend?.call?.(this, result);
    };

    return (
        <List.Item
            right={props => (
                <View {...props} style={styles.right}>
                    {result.loading ? (
                        <ActivityIndicator animating={true} icon="timer-sand" />
                    ) : (
                        <Button onPress={onSendButtonClicked}>{t("components.pendingResultListItem.send")}</Button>
                    )}
                </View>
            )}
            disabled={loading}
            title={result.survey.title}
            description={
                <View style={styles.right}>
                    <Text>{`${t("components.pendingResultListItem.created")}: ${moment(result.createdAt).format(
                        "DD.MM.YYYY HH:mm:ss"
                    )}`}</Text>
                    {result.error ? (
                        <Text style={{ color: theme.colors.error }}>{result.error}</Text>
                    ) : (
                        <>
                            {result.loading ? (
                                <Text>{t("components.pendingResultListItem.sending")}</Text>
                            ) : result.success ? (
                                <Text style={{ color: "rgb(0, 110, 0)" }}>
                                    {t("components.pendingResultListItem.sent")}
                                </Text>
                            ) : (
                                <Text>{t("components.pendingResultListItem.pending")}</Text>
                            )}
                        </>
                    )}
                </View>
            }
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    right: {
        justifyContent: "center"
    }
});

export default PendingResultListItem;
