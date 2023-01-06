import { Text, RadioButton, Button, Checkbox, TextInput, ProgressBar, Avatar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMemo, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { addPendingResult } from "@features/results/resultSlice";

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
    const dispatch = useDispatch();
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

    const canFinish = useMemo(() => {
        const numberOfRequiredQuestionsLeft = questions?.filter(
            question =>
                question.question.required && (!question.selectedAnswer || question.selectedAnswer?.length === 0)
        )?.length;
        return numberOfRequiredQuestionsLeft === 0;
    }, [filled]);

    const canHideSubmitButton = useMemo(
        () => canFinish && activeIndex + 1 === questions?.length,
        [canFinish, activeIndex]
    );

    const isSurveyFinished = useMemo(() => filled.surveyId && filled.completed, [filled]);

    const setEndTime = () => {
        setFilled({
            ...filled,
            questions: questions?.map((q, i) => {
                if (i === activeIndex) {
                    return {
                        ...q,
                        endDates: [...q.endDates, new Date()]
                    };
                } else {
                    return q;
                }
            })
        });
    };

    const onFinishButtonClick = () => {
        setFilled({
            ...filled,
            endDate: new Date(),
            surveyId: survey.id,
            completed: true,
            questions: questions?.map((q, i) => {
                if (i === activeIndex) {
                    return {
                        ...q,
                        endDates: [...q.endDates, new Date()]
                    };
                } else {
                    return q;
                }
            })
        });
    };

    const onSubmitButtonClick = () => {
        onNextQuestionButtonClicked();
    };

    const onNextQuestionButtonClicked = () => {
        setEndTime();
        setActiveIndex(activeIndex === questions?.length - 1 ? activeIndex : activeIndex + 1);
    };

    const onPrevQuestionButtonClicked = () => {
        setEndTime();
        setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
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
                beginDates: [],
                endDates: []
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
                            beginDates: [...q.beginDates, new Date()]
                        };
                    } else {
                        return q;
                    }
                })
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        if (filled.surveyId && filled.completed) {
            dispatch(addPendingResult(filled));
        }
    }, [filled]);

    return (
        <>
            {isSurveyFinished ? (
                <View style={styles.empty}>
                    <Avatar.Icon size={100} icon="check" />
                    <Text style={styles.message} variant="headlineSmall">
                        {t("screens.activeSurvey.success")}
                    </Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <View>
                        <View style={styles.progressControls}>
                            <Button icon="chevron-left" onPress={onPrevQuestionButtonClicked} />
                            <Text variant="titleLarge">{`${activeIndex + 1} / ${questions?.length}`}</Text>
                            <Button disabled={!canGoNext} icon="chevron-right" onPress={onNextQuestionButtonClicked} />
                        </View>
                        <ProgressBar progress={(activeIndex + 1) / questions?.length || 0} />
                    </View>
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
                        <View>
                            {!canHideSubmitButton && (
                                <Button disabled={!canGoNext} mode="contained-tonal" onPress={onSubmitButtonClick}>
                                    {t("screens.activeSurvey.submit")}
                                </Button>
                            )}
                            {canFinish && (
                                <Button style={styles.finishButton} mode="contained" onPress={onFinishButtonClick}>
                                    {t("screens.activeSurvey.finish")}
                                </Button>
                            )}
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10
    },
    title: {
        marginBottom: 10
    },
    progressControls: {
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    finishButton: {
        marginTop: 10
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        textAlign: "center"
    },
    message: {
        textAlign: "center",
        marginTop: 10
    }
});

export default ActiveSurvey;
