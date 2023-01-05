import { List } from "react-native-paper";
import PendingResultListItem from "@components/PendingResultListItem";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const ResultList = ({ results, loading }) => {
    const { t } = useTranslation();
    const lastUpdatedAt = useSelector(state => state.result.lastUpdateAt);

    const lastUpdatedAtFormatted = useMemo(
        () => t("components.surveyList.lastUpdatedAt") + moment(lastUpdatedAt).format("DD.MM.YYYY HH:mm:ss"),
        [lastUpdatedAt]
    );

    return (
        <List.Section>
            <List.Subheader>{lastUpdatedAtFormatted}</List.Subheader>
            {results?.map((result, i) => (
                <PendingResultListItem loading={loading} result={result} key={i} />
            ))}
        </List.Section>
    );
};
export default ResultList;
