import React, { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Portal, Dialog, Text, RadioButton, List } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { logout } from "@features/auth/authSlice";

const SettingsScreen = () => {
    const { t, i18n } = useTranslation();

    const [isExitModalVisible, setExitModalVisible] = useState(false);
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const dispatch = useDispatch();

    const openExitDialog = () => setExitModalVisible(true);
    const closeExitDialog = () => setExitModalVisible(false);

    const openLanguageDialog = () => setLanguageModalVisible(true);
    const closeLanguageDialog = () => setLanguageModalVisible(false);

    const onLogoutButtonClicked = () => {
        dispatch(logout());
    };

    const onLanguageSelected = value => {
        i18n.changeLanguage(value);
        setCurrentLanguage(value);
        closeLanguageDialog();
    };

    const languages = useMemo(
        () => ({
            ru: t("screens.settings.languageModal.ru"),
            en: t("screens.settings.languageModal.en")
        }),
        [() => i18n.language]
    );

    const appInfo = {
        name: "Project Zero Mobile",
        version: "0.1",
        author: "Sergei Shekshuev",
        email: "sergei.shekshuev@gmail.com"
    };

    return (
        <ScrollView>
            <List.Section>
                <List.Subheader>{t("screens.settings.common.header")}</List.Subheader>
                <List.Item
                    title={t("screens.settings.common.language")}
                    description={() => <Text variant="bodyMedium">{languages[currentLanguage]}</Text>}
                    onPress={openLanguageDialog}
                />
            </List.Section>
            <List.Section>
                <List.Subheader>{t("screens.settings.about.header")}</List.Subheader>
                <List.Item title={t("screens.settings.about.name")} description={appInfo.name} />
                <List.Item title={t("screens.settings.about.version")} description={appInfo.version} />
                <List.Item title={t("screens.settings.about.author")} description={appInfo.author} />
                <List.Item title={t("screens.settings.about.email")} description={appInfo.email} />
            </List.Section>
            <View style={styles.container}>
                <Button onPress={openExitDialog}>{t("screens.settings.exit")}</Button>
            </View>
            <Portal>
                <Dialog visible={isExitModalVisible} onDismiss={closeExitDialog}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">{t("screens.settings.exitModal.title")}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onLogoutButtonClicked}>{t("screens.settings.exitModal.yes")}</Button>
                        <Button onPress={closeExitDialog}>{t("screens.settings.exitModal.no")}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
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
            </Portal>
        </ScrollView>
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
