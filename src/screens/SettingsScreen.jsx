import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Portal, Dialog, Text, RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { setAccessToken } from "@features/auth/authSlice";

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

    const logout = () => {
        dispatch(setAccessToken(null));
    };

    const onLanguageSelected = value => {
        i18n.changeLanguage(value);
        setCurrentLanguage(value);
        closeLanguageDialog();
    };

    return (
        <>
            <View style={styles.container}>
                <Button mode="contained" onPress={openLanguageDialog} style={{ marginBottom: 10 }}>
                    {t("screens.settings.chooseLanguage")}
                </Button>
                <Button mode="contained" onPress={openExitDialog}>
                    {t("screens.settings.exit")}
                </Button>
            </View>
            <Portal>
                <Dialog visible={isExitModalVisible} onDismiss={closeExitDialog}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">{t("screens.settings.exitModal.title")}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={logout}>{t("screens.settings.exitModal.yes")}</Button>
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
