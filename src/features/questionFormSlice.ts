import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from '../constants/Form';
import {
  FormDescription,
  FormTitle,
  QuestionTitle,
  QuestionType,
  OptionType,
  Question,
  Form,
} from '../interface/Form';

const initialQuestion = {
  isSelected: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: DEFAULT_VALUES.QUESTION_TYPE,
  options: [`${DEFAULT_VALUES.QUESTION_OPTION} 1`],
  isOtherSelected: false,
  isRequired: false,
};

const initialState = {
  title: DEFAULT_VALUES.TITLE,
  description: '',
  questions: [initialQuestion],
};

const resetQuestionSelection = (state: Form) => {
  const newQuestions = state.questions.map(question => ({
    ...question,
    isSelected: false,
  }));
  state.questions = newQuestions;
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

    selectQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const newQuestions = state.questions.map(question => ({
        ...question,
        isSelected: false,
      }));
      state.questions = newQuestions;
      state.questions[questionIdx].isSelected = true;
    },
    addQuestion: state => {
      const targetIdx = state.questions.findIndex(question => question.isSelected === true) + 1;
      resetQuestionSelection(state);
      state.questions.splice(targetIdx, 0, initialQuestion);
    },
    deleteQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const nextSelectedQuestionIdx = questionIdx === 0 ? 1 : questionIdx - 1;
      resetQuestionSelection(state);
      if (state.questions.length > 1) {
        state.questions[nextSelectedQuestionIdx].isSelected = true;
      }
      state.questions.splice(questionIdx, 1);
    },
    duplicateQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const targetIdx = questionIdx + 1;
      const {questions} = state;
      resetQuestionSelection(state);
      state.questions.splice(targetIdx, 0, questions[questionIdx]);
      state.questions[targetIdx].isSelected = true;
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
    addOtherOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      state.questions[questionIdx].isOtherSelected = true;
    },
    removeOtherOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      state.questions[questionIdx].isOtherSelected = false;
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

  selectQuestion,
  addQuestion,
  deleteQuestion,
  duplicateQuestion,
  toggleRequired,
  resortQuestions,

  addQuestionOption,
  removeQuestionOption,
  addOtherOption,
  removeOtherOption,

  changeOptionValue,
  resortQuestionOptions,
} = questionFormSlice.actions;
export default questionFormSlice.reducer;
