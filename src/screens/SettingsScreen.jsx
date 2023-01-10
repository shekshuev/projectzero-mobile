import React, { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, Text, RadioButton, List, useTheme, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import * as Application from "expo-application";
import { clear as clearLocation } from "@features/location/locationSlice";
import { clear as clearSurvey } from "@features/survey/surveySlice";
import { clear as clearResult } from "@features/results/resultSlice";
import { clear as clearSettings } from "@features/settings/settingsSlice";
import { clear as clearAccount } from "@features/account/accountSlice";
import { clear as clearAuth } from "@features/auth/authSlice";
import { setApiAddress } from "@features/settings/settingsSlice";
import { LOGIN_MAIN, LOGIN_SETTINGS } from "@navigation/routes";

const SettingsScreen = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const apiAddress = useSelector(state => state.settings.apiAddress);

    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
    const [isClearModalVisible, setClearModalVisible] = useState(false);
    const [isApiAddressModalVisible, setApiAddressModalVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [tmpApiAddress, setTmpApiAddress] = useState();
    const dispatch = useDispatch();

    const openLanguageDialog = () => setLanguageModalVisible(true);
    const closeLanguageDialog = () => setLanguageModalVisible(false);

    const openClearDialog = () => setClearModalVisible(true);
    const closeClearDialog = () => setClearModalVisible(false);

    const openApiAddressDialog = () => {
        setTmpApiAddress(apiAddress);
        setApiAddressModalVisible(true);
    };
    const closeApiAddressDialog = () => setApiAddressModalVisible(false);

    const onLanguageSelected = value => {
        i18n.changeLanguage(value);
        setCurrentLanguage(value);
        closeLanguageDialog();
    };

    const onClearButtonClicked = () => {
        dispatch(clearLocation());
        dispatch(clearResult());
        dispatch(clearSurvey());
        dispatch(clearSettings());
        dispatch(clearAccount());
        dispatch(clearAuth());
        if (route.name === LOGIN_SETTINGS) {
            navigation.replace(LOGIN_MAIN);
        }
    };

    const onSetApiAddressButtonClicked = () => {
        dispatch(setApiAddress(tmpApiAddress));
        closeApiAddressDialog();
    };

    const languages = useMemo(
        () => ({
            ru: t("screens.settings.languageModal.ru"),
            en: t("screens.settings.languageModal.en")
        }),
        [() => i18n.language]
    );

    return (
        <>
            <ScrollView>
                <List.Section>
                    <List.Subheader>{t("screens.settings.common.header")}</List.Subheader>
                    <List.Item
                        title={t("screens.settings.common.language")}
                        description={languages[currentLanguage]}
                        onPress={openLanguageDialog}
                    />
                    <List.Item
                        title={t("screens.settings.common.apiAddress")}
                        description={apiAddress || t("screens.settings.common.noApiAddress")}
                        onPress={openApiAddressDialog}
                    />
                </List.Section>
                <List.Section>
                    <List.Subheader>{t("screens.settings.about.header")}</List.Subheader>
                    <List.Item title={t("screens.settings.about.name")} description={Application.applicationName} />
                    <List.Item
                        title={t("screens.settings.about.version")}
                        description={Application.nativeApplicationVersion}
                    />
                </List.Section>
                <View style={styles.container}>
                    <Button textColor={theme.colors.error} onPress={openClearDialog}>
                        {t("screens.settings.clear")}
                    </Button>
                </View>
            </ScrollView>
            <Dialog visible={isApiAddressModalVisible} onDismiss={closeApiAddressDialog}>
                <Dialog.Content>
                    <Text variant="bodyLarge">{t("screens.settings.apiAddressModal.title")}</Text>
                    <TextInput
                        mode="flat"
                        value={tmpApiAddress}
                        label={t("screens.settings.apiAddressModal.label")}
                        onChangeText={setTmpApiAddress}
                        autoCorrect={false}
                        style={{ marginTop: 10 }}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onSetApiAddressButtonClicked}>{t("screens.settings.apiAddressModal.ok")}</Button>
                    <Button onPress={closeApiAddressDialog}>{t("screens.settings.apiAddressModal.cancel")}</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog visible={isClearModalVisible} onDismiss={closeClearDialog}>
                <Dialog.Content>
                    <Text variant="bodyLarge">{t("screens.settings.clearModal.title")}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button textColor={theme.colors.error} onPress={onClearButtonClicked}>
                        {t("screens.settings.clearModal.yes")}
                    </Button>
                    <Button onPress={closeClearDialog}>{t("screens.settings.clearModal.cancel")}</Button>
                </Dialog.Actions>
            </Dialog>
            <Dialog visible={isLanguageModalVisible} onDismiss={closeLanguageDialog}>
                <Dialog.Content>
                    <Text variant="bodyLarge">{t("screens.settings.languageModal.title")}</Text>
                </Dialog.Content>
                <Dialog.Content>
                    <RadioButton.Group onValueChange={onLanguageSelected} value={currentLanguage}>
                        <View style={styles.languageItem}>
                            <RadioButton value="ru" />
                            <Text>{t("screens.settings.languageModal.ru")}</Text>
                        </View>
                        <View style={styles.languageItem}>
                            <RadioButton value="en" />
                            <Text>{t("screens.settings.languageModal.en")}</Text>
                        </View>
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={closeLanguageDialog}>{t("screens.settings.languageModal.cancel")}</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 10
    },
    languageItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});

export default SettingsScreen;
