import { List } from "react-native-paper";
import SurveyListItem from "@components/SurveyListItem";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const SurveyList = ({ surveys, loading, onListItemClicked }) => {
    const { t } = useTranslation();
    const lastUpdatedAt = useSelector(state => state.survey.lastUpdateAt);

    const lastUpdatedAtFormatted = useMemo(
        () => t("components.surveyList.lastUpdatedAt") + moment(lastUpdatedAt).format("DD.MM.YYYY HH:mm:ss"),
        [lastUpdatedAt]
    );

    const onItemSelected = survey => {
        onListItemClicked?.call?.(this, survey.id);
    };
    return (
        <List.Section>
            <List.Subheader>{lastUpdatedAtFormatted}</List.Subheader>
            {surveys?.map(survey => (
                <SurveyListItem
                    loading={loading}
                    survey={survey}
                    key={survey.id}
                    onPress={() => onItemSelected(survey)}
                />
            ))}
        </List.Section>
    );
};
export default SurveyList;
