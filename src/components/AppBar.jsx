import { Appbar, useTheme } from "react-native-paper";

const AppBar = ({ navigation, back, options, backgroundColor }) => {
    const theme = useTheme();
    return (
        <Appbar.Header elevated style={{ backgroundColor: backgroundColor || theme.colors.elevation.level2 }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content color={theme.colors.onBackground} title={options.title} />
            {!back && <Appbar.Action icon="account" onPress={() => {}} />}
        </Appbar.Header>
    );
};

export default AppBar;
