import { Text, RadioButton, Button, Checkbox, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMemo, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

const QuestionHeader = ({ question }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.title}>
            <Text variant="titleLarge">{question.title}</Text>
            {question.required && <Text variant="labelSmall">{t("screens.activeSurvey.required")}</Text>}
        </View>
    );
};

const Single = ({ question, onAnswerSelected }) => {
    const [value, setValue] = useState();

    const onValueChanged = value => {
        setValue(value);
        onAnswerSelected(value);
    };

    return (
        <View>
            <QuestionHeader question={question} />
            <RadioButton.Group onValueChange={newValue => onValueChanged(newValue)} value={value}>
                {question.answers.map((answer, i) => (
                    <RadioButton.Item label={answer.text} value={answer.code} key={i} />
                ))}
            </RadioButton.Group>
        </View>
    );
};

const Multiple = ({ question, onAnswerSelected }) => {
    const [values, setValues] = useState([]);

    const onValueChanged = value => {
        let tmp = [];
        if (values.includes(value)) {
            tmp = values.filter(elem => elem !== value);
        } else {
            tmp = [...values, value];
        }
        setValues(tmp);
        onAnswerSelected(tmp);
    };
    return (
        <View>
            <QuestionHeader question={question} />
            {question.answers.map((answer, i) => (
                <Checkbox.Item
                    label={answer.text}
                    onPress={() => onValueChanged(answer.code)}
                    status={values?.includes(answer.code) ? "checked" : "unchecked"}
                    key={i}
                />
            ))}
        </View>
    );
};

const Open = ({ question, onAnswerSelected }) => {
    const [value, setValue] = useState();

    const onValueChanged = value => {
        setValue(value);
        onAnswerSelected(value);
    };

    return (
        <View>
            <QuestionHeader question={question} />
            <TextInput
                mode="flat"
                value={value}
                label={question?.answers?.[0]?.text}
                onChangeText={onValueChanged}
                style={{ marginBottom: 10 }}
            />
        </View>
    );
};

const ActiveSurvey = ({ route }) => {
    const { t } = useTranslation();
    const { id } = route.params;
    const currentPosition = useSelector(state => state.location.position);
    const surveys = useSelector(state => state.survey.surveys);
    const survey = useMemo(() => surveys?.find(s => s.id === id), [surveys]);

    const [filled, setFilled] = useState({});
    const [questions, setQuestions] = useState();
    const [activeQuestion, setActiveQuestion] = useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState();

    const onNextQuestionButtonClicked = () => {
        if (activeIndex === questions?.length - 1) {
            setActiveIndex(0);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    };

    const onAnswerSelected = answer => {
        console.log(answer);
        setSelectedAnswer(answer);
    };

    useEffect(() => {
        setFilled({
            surveyId: survey.id,
            beginDate: new Date(),
            endDate: null,
            completed: false,
            point: {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [currentPosition.longitude, currentPosition.latitude]
                }
            },
            questions: []
        });
        setQuestions(survey.form.questions);
    }, []);

    useEffect(() => {
        setActiveQuestion(survey.form.questions?.[activeIndex]);
    }, [activeIndex]);

    return (
        <View style={styles.container}>
            {activeQuestion?.type === "single" ? (
                <Single question={activeQuestion} onAnswerSelected={onAnswerSelected} />
            ) : activeQuestion?.type === "multiple" ? (
                <Multiple question={activeQuestion} onAnswerSelected={onAnswerSelected} />
            ) : activeQuestion?.type === "open" ? (
                <Open question={activeQuestion} onAnswerSelected={onAnswerSelected} />
            ) : (
                ""
            )}
            {questions?.length > 0 && (
                <Button style={styles.button} mode="contained" onPress={onNextQuestionButtonClicked}>
                    {t("screens.activeSurvey.next")}
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
    title: {
        marginBottom: 10
    },
    button: {
        width: "100%",
        marginTop: 10
    }
});

export default ActiveSurvey;
