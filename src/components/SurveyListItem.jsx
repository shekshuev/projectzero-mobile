import { List } from "react-native-paper";

const SurveyListItem = ({ survey, loading, ...props }) => {
    return <List.Item disabled={loading} title={survey.title} description={survey.description} {...props} />;
};

export default SurveyListItem;
