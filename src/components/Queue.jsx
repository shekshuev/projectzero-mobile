import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, DeviceEventEmitter } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromQueue, setQueue } from "../redux/queue/queueActions";
import Loader from "../UI/Loader";
import MyButton from "../UI/MyButton";
import { sendSurvey } from "../api/postService";
import { t } from "i18n-js";

const Queue = () => {
    DeviceEventEmitter.addListener("task", async event => {
        if (event?.success === true) {
            await dispatch(deleteItemFromQueue(event.instanceId));
        } else {
            await dispatch(deleteItemFromQueue(event.instanceId));
            await dispatch(setQueue(event.surv));
        }
        setToggleDeleted(!toggleDeleted);
    });

    const queue = useSelector(state => state.queueReducer.queue);
    const { accessToken, refreshToken } = useSelector(state => state.tokensReducer);
    const location = useSelector(state => state.locationReducer.location);
    const [toggleDeleted, setToggleDeleted] = useState(false);
    const [loaderMass, setLoaderMass] = useState([]);
    const dispatch = useDispatch();

    const fillingLoaderMass = (length, index = -1, filler = "") => {
        const initLoaderMass = [];
        for (let i = 0; i < length; ++i) {
            initLoaderMass.push(t("Queue.buttons.sending.default"));
        }
        if (index !== -1 && filler) {
            initLoaderMass[index] = filler;
            setLoaderMass(initLoaderMass);
        } else if (length) {
            setLoaderMass(initLoaderMass);
        } else {
            setLoaderMass([]);
        }
    };

    useEffect(() => {
        fillingLoaderMass(queue === null ? 0 : queue.length);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {queue ? (
                    queue.map((surv, index) => (
                        <View style={styles.containerI}>
                            <TouchableOpacity style={styles.itemCont}>
                                <Text style={styles.title}>
                                    {surv.additional.title ? surv.additional.title : t("Queue.item.noTitle")}
                                </Text>
                                <Text style={styles.description}>
                                    {surv.additional.description
                                        ? surv.additional.description
                                        : t("Queue.item.noDescr")}
                                </Text>
                                <View style={styles.contAdditional}>
                                    <Text style={styles.idSurvey}>{t("Queue.item.indexCaption")} </Text>
                                    <Text style={styles.valueIDError}>
                                        {surv.surveyCurr.instanceId
                                            ? surv.surveyCurr.instanceId
                                            : t("Queue.item.noIndex")}
                                    </Text>
                                </View>
                                <View style={styles.contAdditional}>
                                    <Text style={styles.idSurvey}>{t("Queue.item.errorTitle")}</Text>
                                    <Text style={styles.valueIDError}>
                                        {surv.additional.errorSending
                                            ? surv.additional.errorSending
                                            : t("Queue.item.noErrorInf")}
                                    </Text>
                                </View>
                                {surv.additional.error ? (
                                    <Text style={styles.notSent}>{t("Queue.item.delayedSendingError")}</Text>
                                ) : (
                                    console.log("")
                                )}
                                <View style={styles.btnsCont}>
                                    <MyButton
                                        title={t("Queue.buttons.deleting")}
                                        onPress={async () => {
                                            await dispatch(deleteItemFromQueue(surv.surveyCurr.instanceId));
                                            setToggleDeleted(!toggleDeleted);
                                        }}
                                    />
                                    <View style={{ width: 20 }}></View>
                                    <MyButton
                                        title={loaderMass[index]}
                                        onPress={() => {
                                            fillingLoaderMass(
                                                queue.length,
                                                index,
                                                t("Queue.buttons.sending.processing")
                                            );
                                            setTimeout(() => {
                                                sendSurvey(accessToken, surv.surveyCurr, location.coords).then(
                                                    result => {
                                                        if (result.status === 200 || result.status === 201) {
                                                            fillingLoaderMass(
                                                                queue.length,
                                                                index,
                                                                t("Queue.buttons.sending.success"),
                                                                loaderMass
                                                            );
                                                            setTimeout(() => {
                                                                fillingLoaderMass(
                                                                    queue.length,
                                                                    index,
                                                                    t("Queue.buttons.sending.default"),
                                                                    loaderMass
                                                                );
                                                                dispatch(
                                                                    deleteItemFromQueue(surv.surveyCurr.instanceId)
                                                                );
                                                                let newMass = loaderMass;
                                                                newMass.splice(index, 1);
                                                                setLoaderMass(newMass);
                                                                setToggleDeleted(!toggleDeleted);
                                                            }, 1500);
                                                        }
                                                    },
                                                    reject => {
                                                        fillingLoaderMass(
                                                            queue.length,
                                                            index,
                                                            t("Queue.buttons.sending.error")
                                                        );
                                                        setTimeout(() => {
                                                            fillingLoaderMass(
                                                                queue.length,
                                                                index,
                                                                t("Queue.buttons.sending.default")
                                                            );
                                                        }, 1500);
                                                    }
                                                );
                                            }, 2000);
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : queue === null ? (
                    <Text style={styles.empty}>{t("Queue.empty")}</Text>
                ) : (
                    <Loader />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    containerI: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    itemCont: {
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginTop: 20,
        paddingVertical: 30,
        backgroundColor: "white"
    },
    title: {
        fontSize: 20,
        color: "sandybrown",
        textAlign: "center",
        paddingHorizontal: 10
    },
    description: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
        paddingHorizontal: 10
    },
    idSurvey: {
        fontSize: 16,
        color: "#000",
        textAlign: "center",
        padding: 10
    },
    notEmpty: {
        fontSize: 24,
        textAlign: "center",
        paddingHorizontal: 20,
        marginVertical: 20
    },
    empty: {
        fontSize: 24,
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 300
    },
    notSent: {
        fontSize: 14,
        color: "#f00",
        textAlign: "center",
        padding: 10
    },
    btnsCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    valueIDError: {
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        paddingHorizontal: 10
    },
    contAdditional: {
        marginVertical: 10
    }
});

export default Queue;
