import { useTranslation } from "react-i18next";
import { List, ActivityIndicator } from "react-native-paper";

const PendingResultListItem = ({ result, loading, ...props }) => {
    const { t } = useTranslation();
    return (
        <List.Item
            right={props => <ActivityIndicator animating={true} {...props} icon="timer-sand" />}
            disabled={loading}
            title={result.survey.title}
            description={t("components.pendingResultListItem.pending")}
            {...props}
        />
    );
};

export default PendingResultListItem;
