import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter} from "react-native";
import { sendSurvey } from "./postService";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from "i18n-js";

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const keys = JSON.parse(await AsyncStorage.getItem('persist:root'))
    const location = JSON.parse(keys.locationReducer).location
    const accessToken = JSON.parse(keys.tokensReducer).accessToken
    const queue = JSON.parse(keys.queueReducer).queue
    if (accessToken && queue) {

                queue?.map(async (edge) => {
                    const data = edge.surveyCurr
                    if (data) {
                        try {
                            const result = await sendSurvey(accessToken, data, location.coords);
                            if (result.status === 200 || result.status === 201) {
                                DeviceEventEmitter.emit("task", {
                                    instanceId:data.instanceId,
                                    success: true
                                });
                            }
                        } catch (e) {
                            edge.additional.error = true
                            DeviceEventEmitter.emit("task", {
                                instanceId:data.instanceId,
                                surv: edge,
                                success: false
                            });
                        }
                    }
                })
            }
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 1, // 15 minutes
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
}

async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

const Background = () => {

    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(async() => {
        await checkStatusAsync();
    }, []);

    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }

        await checkStatusAsync();
    };

    return (
        <View style={styles.backImage}>
            <Text style={styles.labelItem}>{t("Background.caption")}</Text>
            <TouchableOpacity
                style={{marginTop:5}}
                onPress={async () => {
                    await toggleFetchTask()
                }}
            >
                <Image source={require('../assets/images/sending.png')}/>
            <Text style={styles.isPowered}>{isRegistered?t("Background.enabled"):t("Background.disabled")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backImage: {
        width: 140,
        height: 140,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 50
    },
    labelItem: {
        fontSize: 24,
        color: 'sandybrown',
        fontWeight: '700',
        textAlign:'center'
    },
    isPowered:{
        fontSize: 20,
        color: '#000',
        textAlign:'center'
    }
});

export default Background;
