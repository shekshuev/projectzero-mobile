import { useTranslation } from "react-i18next";
import { List, ActivityIndicator, Button, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PendingResultListItem = ({ result, loading, offline, onSend, onShare, ...props }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const onShareButtonClicked = () => {
        onShare?.call?.(this, result);
    };

    const onSendButtonClicked = () => {
        onSend?.call?.(this, result);
    };

    return (
        <List.Item
            right={props => (
                <View {...props} style={styles.right}>
                    {result.loading ? (
                        <ActivityIndicator animating={true} />
                    ) : (
                        <View style={styles.actions}>
                            <Button style={styles.downloadButton} onPress={onShareButtonClicked}>
                                <MaterialCommunityIcons name="share" size={20} color={theme.colors.primary} />
                            </Button>
                            <Button disabled={offline} onPress={onSendButtonClicked}>
                                <MaterialCommunityIcons
                                    name="send"
                                    size={20}
                                    color={offline ? theme.colors.disabled : theme.colors.primary}
                                />
                            </Button>
                        </View>
                    )}
                </View>
            )}
            disabled={loading}
            title={result?.survey?.title}
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
    },
    actions: {
        flexDirection: "row"
    },
    downloadButton: {
        marginRight: 4
    }
});

export default PendingResultListItem;
