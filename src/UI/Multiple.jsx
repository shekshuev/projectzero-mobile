import React, {useState, useEffect} from 'react';
import Variant from "./Variant";

const Multiple = (props) => {

    const [begin, setBegin] = useState(new Date())

    useEffect(()=>{
        setBegin(new Date())
    },[props.askID])



    return (
        props.data.map( (variant) =>
            <Variant
                result={props.result}
                setResult={props.setResult}
                textV={variant.text}
                ansID={variant.id}
                askID={props.askID}
                key={variant.id}
                begin={begin}
                create={props.create}
            />
        )
    );
};

export default Multiple;
