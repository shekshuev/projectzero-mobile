import { Appbar, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "@features/auth/authSlice";
import { ROOT_ACCOUNT } from "@navigation/routes";
import { isTokenStillFresh } from "@utils/jwt";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { importSurveys } from "@features/survey/surveySlice";
import { useTranslation } from "react-i18next";

const AppBar = ({ navigation, back, options, backgroundColor, hasImportButton }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);
    const surveys = useSelector(state => state.survey.surveys);

    const [isSignedIn, setSignedIn] = useState(isTokenStillFresh(accessToken));

    useEffect(() => setSignedIn(isTokenStillFresh(accessToken)), [accessToken]);

    const goToLoginScreen = () => {
        dispatch(logout());
    };

    const goToAccountScreen = () => {
        navigation.navigate(ROOT_ACCOUNT);
    };

    const importSurveyFromFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: "application/json" });
        if (result?.type === "success") {
            const data = await FileSystem.readAsStringAsync(result.uri);
            dispatch(importSurveys(data));
            await FileSystem.deleteAsync(result.uri);
        }
    };

    return (
        <Appbar.Header elevated style={{ backgroundColor: backgroundColor || theme.colors.elevation.level2 }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content color={theme.colors.onBackground} title={options.title} />
            {hasImportButton && <Appbar.Action icon="file-import-outline" onPress={importSurveyFromFile} />}
            {!back &&
                (isSignedIn ? (
                    <Appbar.Action icon="account-circle-outline" onPress={goToAccountScreen} />
                ) : (
                    <Appbar.Action icon="login" onPress={goToLoginScreen} />
                ))}
        </Appbar.Header>
    );
};

export default AppBar;
