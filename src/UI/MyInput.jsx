import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const MyInput = (props) => {
    return (
        <View style={styles.main}>
            <View style={styles.wrapperInput}>
                <Text style={styles.inputText}>{props.label}</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={props.secure}
                    onChangeText={text=>props.onChange(text)}
                    value={props.value?props.value:''}
                    keyboardType={props.keyType?props.keyType:'default'}
                    onSubmitEditing={props.onSubmit?props.onSubmit:()=>{}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        display:'flex',
        alignItems:'center',
    },
    wrapperInput: {
        display:'flex',
        alignItems:'flex-start',
    },
    input: {
        borderColor:'sandybrown',
        borderWidth:2,
        width:250,
        height:40,
        fontSize:20,
        marginTop:10,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:4
    },
    inputText: {
        marginTop:20,
        fontSize:18,

    }
})

export default MyInput;
