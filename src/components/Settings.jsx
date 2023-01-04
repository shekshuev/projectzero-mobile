import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../redux/tokens/tokensActions";
import Background from "../api/Background";
import { t } from "i18n-js";
import { setLanguage } from "../redux/language/languageActions";

const Settings = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const languages = [
        { asset: require("../assets/images/ru.png"), lang: "ru" },
        { asset: require("../assets/images/en.png"), lang: "en" }
    ];
    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t("Settings.modal.title")}</Text>
                        <View style={styles.buttonWrap}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={async () => {
                                    setModalVisible(!modalVisible);
                                    await dispatch(setAccessToken(""));
                                    await dispatch(setRefreshToken(""));
                                    await AsyncStorage.removeItem("token");
                                    props.setIsAuth(false);
                                }}>
                                <Text style={styles.textStyle}>{t("Settings.modal.yes")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>{t("Settings.modal.no")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Background />
            <View style={styles.backImage}>
                <Text style={styles.labelItem}>{t("Settings.exit")}</Text>
                <TouchableOpacity
                    style={{ marginTop: 5 }}
                    onPress={async () => {
                        setModalVisible(true);
                    }}>
                    <Image source={require("../assets/images/logout.png")} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.labelItem}>{t("Settings.chooseLanguage")}</Text>
                <View style={styles.langCont}>
                    {languages.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.langItem}
                            onPress={async () => {
                                await dispatch(setLanguage(item.lang));
                            }}>
                            <Text style={{ fontSize: 16 }}>{item.lang}</Text>
                            <Image source={item.asset} resizeMode={"contain"} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    backImage: {
        width: 140,
        height: 140,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 50
    },
    labelItem: {
        fontSize: 24,
        color: "sandybrown",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonWrap: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 20
    },
    buttonOpen: {
        backgroundColor: "sandybrown"
    },
    buttonClose: {
        backgroundColor: "sandybrown"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    langCont: {
        width: Dimensions.get("window").width * 0.8,
        height: 80,
        flexDirection: "row",
        justifyContent: "center"
    },
    langItem: {
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 3,
        borderColor: "sandybrown",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10
    }
});

export default Settings;
