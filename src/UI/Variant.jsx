import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from "react-native";

const Variant = (props) => {
    //функция для поиска ответа в конечном массиве, чтобы его удалить
    const isInArray = (i)=>{
        return ((i.id === props.askID) && i.answerId === props.ansID)
    }
    const ind = props.result.questions.findIndex(isInArray)
    //нажата ли кнопка
    const [pressed, setPressed] = useState(ind !== -1)

    return (
        <TouchableOpacity
            style={pressed?styles.varContP:styles.varCont}
            onPress={()=>{
                //логика такая: до изменения состояния нажатия мы смотрим его,
                // далее либо добавляем в общий массив конкретный ответ,
                // либо удаляем его, предварительно найдя(его)
                if(!pressed){
                    const ans = {
                        "id": props.askID,
                        "answerId": props.ansID,
                        "createdAt": props.create,
                        "beginDate": props.begin,
                        "endDate": new Date(),
                        "text": props.textV
                    }
                    const currRes = props.result
                    currRes.questions.push(ans)
                    props.setResult(currRes)
                }
                else{
                    const ind = props.result.questions.findIndex(isInArray)
                    if(ind !== -1){
                        const currRes = props.result
                        currRes.questions.splice(ind, 1)
                        props.setResult(currRes)
                    }
                }
                setPressed( !pressed )
            }}
        >
            <Text style={styles.varText}>
                {props.textV}
            </Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    varCont:{
        padding:10,
        backgroundColor:'#fff',
        borderColor:'sandybrown',
        borderWidth:3,
        borderRadius:10,
        marginVertical:10
    },
    varContP:{
        padding:10,
        backgroundColor:'gray',
        borderColor:'sandybrown',
        borderWidth:3,
        borderRadius:10,
        marginVertical:10
    },
    varText:{
        fontSize:20,
        color:'sandybrown',
        textAlign:'center'
    }
})

export default Variant;
