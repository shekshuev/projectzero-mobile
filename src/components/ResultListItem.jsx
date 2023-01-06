import { List } from "react-native-paper";

const ResultListItem = ({ result, loading, ...props }) => {
    return (
        <List.Item
            disabled={loading}
            title={result?.survey?.title}
            description={result?.survey?.description}
            {...props}
        />
    );
};

export default ResultListItem;
