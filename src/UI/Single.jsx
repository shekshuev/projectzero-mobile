import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
const Single = (props) => {

    const isInArray = (i)=>{
        return (i.id === props.askID)
    }

    const [begin, setBegin] = useState(new Date())

    const [ind, setInd] = useState(props.result.questions.findIndex(isInArray))

    const [radio, setRadio] = useState((ind === -1)?'':props.result.questions[ind].answerId)

    useEffect(()=>{
        const myInd = props.result.questions.findIndex(isInArray)
        setInd(myInd)
        setRadio((myInd===-1) ? '' : props.result.questions[myInd].answerId)
    }, [props.askID])

    return (
        <View>
            <RadioButton.Group
                // загоняем новое значение
                onValueChange={newValue => {
                    if(ind === -1){
                        const ans = {
                            "id": props.askID,
                            "answerId": newValue,
                            "createdAt": props.create,
                            "beginDate": begin,
                            "endDate": "2021-12-31T00:00:00.000",
                        }

                        const currRes = props.result
                        currRes.questions.push(ans)
                        props.setResult(currRes)
                    }
                    else{
                        const currRes = props.result
                        currRes.questions[ind].answerId = newValue
                        props.setResult(currRes)
                    }
                    setRadio(newValue);
                    setInd(props.result.questions.findIndex(isInArray))
                }}
                value={radio}
            >
                {
                    props.data.map((ans)=>
                        <View style={styles.radioCont} key={ans.id}>
                            <RadioButton value={ans.id}/>
                            <Text style={styles.ansText}>{ans.text}</Text>
                        </View>
                    )
                }
            </RadioButton.Group>
        </View>
    );
};
const styles = StyleSheet.create({
    radioCont: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    ansText:{
        fontSize:20,
        marginVertical:10
    }
})
export default Single;
