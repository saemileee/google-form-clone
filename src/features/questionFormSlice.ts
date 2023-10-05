import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from '../constants/Form';

const initialQuestion = {
    title: DEFAULT_VALUES.QUESTION_TITLE,
    type: DEFAULT_VALUES.QUESTION_TYPE,
    options: [DEFAULT_VALUES.QUESTION_OPTION],
    isRequired: false,
};

const initialState = {
    title: DEFAULT_VALUES.TITLE,
    description: '',
    questions: [initialQuestion],
};

const questionFormSlice = createSlice({
    name: 'questionForm',
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        changeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },

        addQuestion: state => {
            state.questions.push(initialQuestion);
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            const questionIdx = action.payload;
            state.questions.splice(questionIdx, 1);
        },
        duplicateQuestion: (state, action: PayloadAction<number>) => {
            const questionIdx = action.payload;
            const {questions} = state;
            const newQuestion = questions[questionIdx];
            state.questions.splice(questionIdx, 0, newQuestion);
        },

        addQuestionOption: (state, action: PayloadAction<number>) => {
            const questionIdx = action.payload;
            const newOptionLength = state.questions[questionIdx].options.length + 1;
            state.questions[questionIdx].options.push(`Option ${newOptionLength}`);
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
            action: PayloadAction<{questionIdx: number; optionIdx: number; value: string}>
        ) => {
            const {questionIdx, optionIdx, value} = action.payload;
            state.questions[questionIdx].options[optionIdx] = value;
        },
    },
});

export const {
    changeTitle,
    changeDescription,
    addQuestion,
    deleteQuestion,
    duplicateQuestion,
    addQuestionOption,
    removeQuestionOption,
    changeOptionValue,
} = questionFormSlice.actions;
export default questionFormSlice.reducer;
