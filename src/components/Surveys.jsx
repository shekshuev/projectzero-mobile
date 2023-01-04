import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import SurveyTemp from "./SurveyTemp";
import Loader from "../UI/Loader";
import { t } from "i18n-js";

const Surveys = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView>
            {
                props.route.params.surveys
                    ?
                    props.route.params.surveys.length !== 0
                        ?
                        props.route.params.surveys.map( (surv) =>
                            <SurveyTemp
                                key={surv.id}
                                data={surv}
                                navigation={props.navigation}
                                setSurv={props.route.params.setSurv}
                            />
                        )
                        :
                        <View style={styles.emptyListCont}>
                            {props.route.params.total
                                ?
                                <Text style={styles.emptyList}>{t('Surveys.noSurvInArea')}</Text>
                                :
                                <Text style={styles.emptyList}>{t('Surveys.noSurvAtAll')}</Text>
                            }
                        </View>
                    :
                    <Loader/>
            }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'sandybrown',
        width:'100%',
        height:'100%'
    },
    emptyListCont: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.8,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyList: {
        fontSize: 24,
        textAlign: 'center',
        color:'#fff'
    }
})

export default Surveys;
