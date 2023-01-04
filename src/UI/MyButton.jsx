import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const MyButton = (props) => {

    const disabledB = props.disabled

    return (
            <View style={styles.main}>
                <TouchableOpacity style={styles.myBtn} onPress={props.onPress?props.onPress:()=>{}} disabled={disabledB}>
                    <Text style={styles.myBtnText}>{props.title}</Text>
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    main: {
        display:'flex',
        alignItems:'center',
        marginTop:30
    },
    myBtn: {
        width:'auto',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        color: 'sandybrown',
        borderRadius:4,
        backgroundColor: 'sandybrown',
        borderWidth: 2,
        borderColor:'sandybrown',
    },
    myBtnText: {
        fontSize: 20,
        color:'#fff'
    }
});

export default MyButton;
