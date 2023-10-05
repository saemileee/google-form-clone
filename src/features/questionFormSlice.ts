import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from '../constants/Form';
import {
    FormDescription,
    FormTitle,
    QuestionTitle,
    QuestionType,
    OptionType,
    Question,
} from '../interface/Form';

const initialQuestion = {
    isSelected: true,
    title: DEFAULT_VALUES.QUESTION_TITLE,
    type: DEFAULT_VALUES.QUESTION_TYPE,
    options: [`${DEFAULT_VALUES.QUESTION_OPTION} 1`],
    isRequired: false,
};

// questionLength 추가
const initialState = {
    title: DEFAULT_VALUES.TITLE,
    description: '',
    questions: [initialQuestion],
};

const questionFormSlice = createSlice({
    name: 'questionForm',
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<{value: FormTitle}>) => {
            const {value} = action.payload;
            state.title = value;
        },
        changeDescription: (state, action: PayloadAction<{value: FormDescription}>) => {
            const {value} = action.payload;
            state.description = value;
        },

        changeQuestionTitle: (
            state,
            action: PayloadAction<{questionIdx: number; value: QuestionTitle}>
        ) => {
            const {questionIdx, value} = action.payload;
            state.questions[questionIdx].title = value;
        },
        changeQuestionType: (
            state,
            action: PayloadAction<{questionIdx: number; value: QuestionType}>
        ) => {
            const {questionIdx, value} = action.payload;
            state.questions[questionIdx].type = value;
        },

        addQuestion: state => {
            const targetIdx = state.questions.findIndex(question => question.isSelected === true);
            state.questions.splice(targetIdx, 0, initialQuestion);
        },
        deleteQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
            const {questionIdx} = action.payload;
            state.questions.splice(questionIdx, 1);
        },
        duplicateQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
            const {questionIdx} = action.payload;
            const {questions} = state;
            const newQuestion = questions[questionIdx];
            state.questions.splice(questionIdx, 0, newQuestion);
        },
        toggleRequired: (state, action: PayloadAction<{questionIdx: number}>) => {
            const {questionIdx} = action.payload;
            const newIsRequired = !state.questions[questionIdx].isRequired;
            state.questions[questionIdx].isRequired = newIsRequired;
        },
        resortQuestions: (state, action: PayloadAction<{questions: Question[]}>) => {
            const {questions} = action.payload;
            state.questions = questions;
        },

        addQuestionOption: (state, action: PayloadAction<{questionIdx: number}>) => {
            const {questionIdx} = action.payload;
            const newOptionLength = state.questions[questionIdx].options.length + 1;
            state.questions[questionIdx].options.push(
                `${DEFAULT_VALUES.QUESTION_OPTION} ${newOptionLength}`
            );
        },
        removeQuestionOption: (
            state,
            action: PayloadAction<{questionIdx: number; optionIdx: number}>
        ) => {
            const {questionIdx, optionIdx} = action.payload;
            state.questions[questionIdx].options.splice(optionIdx, 1);
        },
        changeOptionValue: (
            state,
            action: PayloadAction<{questionIdx: number; optionIdx: number; value: OptionType}>
        ) => {
            const {questionIdx, optionIdx, value} = action.payload;
            state.questions[questionIdx].options[optionIdx] = value;
        },
        resortQuestionOptions: (
            state,
            action: PayloadAction<{questionIdx: number; options: OptionType[]}>
        ) => {
            const {options, questionIdx} = action.payload;
            state.questions[questionIdx].options = options;
        },
    },
});

export const {
    changeTitle,
    changeDescription,

    changeQuestionTitle,
    changeQuestionType,

    addQuestion,
    deleteQuestion,
    duplicateQuestion,
    toggleRequired,
    resortQuestions,

    addQuestionOption,
    removeQuestionOption,
    changeOptionValue,
    resortQuestionOptions,
} = questionFormSlice.actions;
export default questionFormSlice.reducer;
