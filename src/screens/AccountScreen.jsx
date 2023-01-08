import { View, StyleSheet } from "react-native";
import { Avatar, Text, ActivityIndicator, Button, Portal, Dialog } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logout } from "@features/auth/authSlice";
import { getAccountInfo } from "@features/account/accountApi";

const AccountScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const account = useSelector(state => state.account.account);
    const loading = useSelector(state => state.account.loading);

    const [isExitModalVisible, setExitModalVisible] = useState(false);

    const fullName = useMemo(() => {
        if (account) {
            if (account?.firstName && account?.lastName) {
                return `${account.firstName} ${account.lastName}`;
            } else if (account?.firstName && !account?.lastName) {
                return account.firstName;
            } else if (!account?.firstName && account?.lastName) {
                return account.lastName;
            } else {
                return t("screens.account.noName");
            }
        } else {
            return t("screens.account.noName");
        }
    }, [account]);

    const role = useMemo(() => {
        if (account?.role === "interviewer") {
            return t("screens.account.interviewer");
        } else if (account?.role === "admin") {
            return t("screens.account.admin");
        } else {
            return null;
        }
    }, [account]);

    const openExitDialog = () => setExitModalVisible(true);
    const closeExitDialog = () => setExitModalVisible(false);

    const onLogoutButtonClicked = () => {
        dispatch(logout());
    };

    useEffect(() => {
        navigation.setOptions({ title: account?.userName });
        if (!loading) {
            dispatch(getAccountInfo());
        }
    }, []);

    return (
        <View style={styles.container}>
            {loading && !account ? (
                <ActivityIndicator animating={true} size="large" />
            ) : (
                <>
                    <Avatar.Icon size={90} icon="account" />
                    <Text style={styles.fullName} variant="headlineMedium">
                        {fullName}
                    </Text>
                    <Text variant="labelMedium">{role}</Text>
                </>
            )}
            <Button style={styles.exitButton} onPress={openExitDialog}>
                {t("screens.account.exit")}
            </Button>
            <Portal>
                <Dialog visible={isExitModalVisible} onDismiss={closeExitDialog}>
                    <Dialog.Content>
                        <Text variant="bodyLarge">{t("screens.account.exitModal.title")}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onLogoutButtonClicked}>{t("screens.account.exitModal.yes")}</Button>
                        <Button onPress={closeExitDialog}>{t("screens.account.exitModal.no")}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    fullName: {
        marginTop: 20,
        marginBottom: 10
    },
    exitButton: {
        marginTop: 30
    }
});

export default AccountScreen;
