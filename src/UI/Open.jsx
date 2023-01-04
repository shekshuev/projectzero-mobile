import React, {useState, useEffect} from 'react';
import { View, Dimensions } from "react-native";
import MyInput from "./MyInput";

const Open = (props) => {

    const [begin, setBegin] = useState(new Date())

    const isInArray = (i)=>{
        return (i.id === props.askID && i.answerId === props.ansID)
    }
    const [ind, setInd] = useState(props.result.questions.findIndex(isInArray))
    const [openA, setOpenA] = useState((ind===-1) ? '' : props.result.questions[ind].text)

    useEffect(()=>{
        const myInd = props.result.questions.findIndex(isInArray)
        setInd(myInd)
        setOpenA((myInd===-1) ? '' : props.result.questions[myInd].text)
    }, [props.askID])

    useEffect(() => {
        const currRes = props.result
        if(ind === -1){
            const ans = {
                "id": props.askID,
                "answerId":props.ansID,
                "createdAt": props.create,
                "beginDate": begin,
                "endDate": new Date(),
                "text": openA
            }
            currRes.questions.push(ans)
        }
        else{
            currRes.questions[ind].text = openA
        }
        props.setResult(currRes)
        setInd(props.result.questions.findIndex(isInArray))
    }, [openA])

    return (
        <View style={{marginTop:'40%'}}>
            <MyInput
                label={props.askText}
                onChange={setOpenA}
                value={openA}
            />
        </View>
    );
};

export default Open;
