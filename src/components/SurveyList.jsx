import { List } from "react-native-paper";
import SurveyListItem from "@components/SurveyListItem";

const SurveyList = ({ surveys, loading }) => {
    const onItemSelected = survey => {
        console.log(survey.id);
    };
    return (
        <List.Section>
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
