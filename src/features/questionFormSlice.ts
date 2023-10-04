import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from '../constants/Form';

const initialQuestion = {
    title: DEFAULT_VALUES.QUESTION_TITLE,
    type: DEFAULT_VALUES.QUESTION_TYPE,
    option: [DEFAULT_VALUES.QUESTION_OPTION],
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
        addQuestion: state => {
            state.questions = [...state.questions, initialQuestion];
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            const newQuestions = state.questions.filter((_, idx) => action.payload !== idx);
            state.questions = newQuestions;
        },
        duplicateQuestion: (state, action: PayloadAction<number>) => {
            const questionIdx = action.payload;
            const {questions} = state;
            const newQuestion = questions[questionIdx];
            const newQuestions = [...questions];
            newQuestions.splice(questionIdx, 0, newQuestion);
            state.questions = newQuestions;
        },
    },
});

export const {addQuestion, deleteQuestion, duplicateQuestion} = questionFormSlice.actions;
export default questionFormSlice.reducer;
