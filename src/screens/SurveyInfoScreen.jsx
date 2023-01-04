import { List, Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { ScrollView, StyleSheet } from "react-native";

const SurveyInfoScreen = ({ route }) => {
    const { t } = useTranslation();
    const { id } = route.params;
    const surveys = useSelector(store => store.survey.surveys);
    const survey = useMemo(() => surveys?.find(s => s.id === id), [id]);

    const onStartSurveyButtonClicked = () => {
        console.log(123);
    };

    return (
        <ScrollView>
            <List.Section>
                <List.Item
                    title={survey.title}
                    description={() => <Text variant="bodyMedium">{survey.description}</Text>}
                />
                <List.Item
                    title={t("screens.surveyInfo.beginDate")}
                    description={moment(survey.beginDate).format("DD.MM.YYYY HH:mm")}
                />
                <List.Item
                    title={t("screens.surveyInfo.endDate")}
                    description={moment(survey.endDate).format("DD.MM.YYYY HH:mm")}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{t("screens.surveyInfo.form")}</List.Subheader>
                <List.Item
                    title={survey.form.title}
                    description={() => <Text variant="bodyMedium">{survey.form.description}</Text>}
                />
                <List.Item title={t("screens.surveyInfo.questionsCount")} description={survey.form.questions.length} />
            </List.Section>
            <Button style={styles.button} icon="play" mode="contained" onPress={onStartSurveyButtonClicked}>
                {t("screens.surveyInfo.startSurvey")}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 10
    }
});

export default SurveyInfoScreen;
