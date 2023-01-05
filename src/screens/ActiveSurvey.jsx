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
    const [value, setValue] = useState(question.selectedAnswer);

    const onValueChanged = value => {
        setValue(value);
        onAnswerSelected(value);
    };

    return (
        <View>
            <QuestionHeader question={question.question} />
            <RadioButton.Group onValueChange={newValue => onValueChanged(newValue)} value={value}>
                {question?.question?.answers?.map((answer, i) => (
                    <RadioButton.Item label={answer.text} value={answer.code} key={i} />
                ))}
            </RadioButton.Group>
        </View>
    );
};

const Multiple = ({ question, onAnswerSelected }) => {
    const [values, setValues] = useState(question.selectedAnswer || []);

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
            <QuestionHeader question={question.question} />
            {question?.question?.answers?.map((answer, i) => (
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
    const [value, setValue] = useState(question.selectedAnswer);

    const onValueChanged = value => {
        setValue(value);
        onAnswerSelected(value);
    };

    return (
        <View>
            <QuestionHeader question={question.question} />
            <TextInput
                mode="flat"
                value={value}
                label={question?.question?.answers?.[0]?.text}
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

    const [activeIndex, setActiveIndex] = useState();

    const questions = useMemo(() => filled.questions, [filled]);
    const activeQuestion = useMemo(() => questions?.[activeIndex], [activeIndex]);
    const canGoNext = useMemo(() => {
        if (!questions?.[activeIndex]?.question?.required) {
            return true;
        } else if (!!questions?.[activeIndex]?.selectedAnswer) {
            if (
                Object.prototype.toString.apply(questions?.[activeIndex]?.selectedAnswer) === "[object Array]" &&
                questions?.[activeIndex]?.selectedAnswer?.length === 0
            ) {
                return false;
            }
            return true;
        }
        return false;
    }, [filled]);

    const onNextQuestionButtonClicked = () => {
        setFilled({
            ...filled,
            questions: questions?.map((q, i) => {
                if (i === activeIndex) {
                    return {
                        ...q,
                        endDate: new Date()
                    };
                } else {
                    return q;
                }
            })
        });
        setActiveIndex(activeIndex === questions?.length - 1 ? 0 : activeIndex + 1);
    };

    const onAnswerSelected = answer => {
        setFilled({
            ...filled,
            questions: questions?.map((q, i) => {
                if (i === activeIndex) {
                    return {
                        ...q,
                        selectedAnswer: answer
                    };
                } else {
                    return q;
                }
            })
        });
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
            questions: survey.form.questions?.map(q => ({
                question: q,
                selectedAnswer: null,
                beginDate: null,
                endDate: null
            }))
        });
        setActiveIndex(0);
    }, []);

    useEffect(() => {
        if (questions) {
            setFilled({
                ...filled,
                questions: questions?.map((q, i) => {
                    if (i === activeIndex) {
                        return {
                            ...q,
                            beginDate: new Date()
                        };
                    } else {
                        return q;
                    }
                })
            });
        }
    }, [activeIndex]);

    return (
        <View style={styles.container}>
            {activeQuestion?.question?.type === "single" ? (
                <Single question={activeQuestion} onAnswerSelected={onAnswerSelected} />
            ) : activeQuestion?.question?.type === "multiple" ? (
                <Multiple question={activeQuestion} onAnswerSelected={onAnswerSelected} />
            ) : activeQuestion?.question?.type === "open" ? (
                <Open question={activeQuestion} onAnswerSelected={onAnswerSelected} />
            ) : (
                ""
            )}
            {questions?.length > 0 && (
                <Button
                    style={styles.button}
                    disabled={!canGoNext}
                    mode="contained"
                    onPress={onNextQuestionButtonClicked}>
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
