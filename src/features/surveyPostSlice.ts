import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES, QUESTION_TYPES} from '../constants/Form';
import {
  FormDescription,
  FormTitle,
  QuestionTitle,
  QuestionType,
  OptionType,
  Question,
  Form,
} from '../interface/Form';
import {formPostStateStorage} from '../store/localStorage';

const initialQuestion = {
  isSelected: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: DEFAULT_VALUES.QUESTION_TYPE,
  options: [`${DEFAULT_VALUES.QUESTION_OPTION} 1`],
  isOtherSelected: false,
  isRequired: false,
};

const cachedState = formPostStateStorage.getItem();

export const initialPostFormState = {
  title: DEFAULT_VALUES.TITLE,
  description: '',
  questions: [initialQuestion],
};

export const initialState: Form = cachedState || initialPostFormState;

const resetQuestionSelection = (state: Form) => {
  const newQuestions = state.questions.map(question => ({
    ...question,
    isSelected: false,
  }));
  state.questions = newQuestions;
};

const surveyPostSlice = createSlice({
  name: 'surveyPostSlice',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<{value: FormTitle}>) => {
      const {value} = action.payload;
      state.title = value;

      formPostStateStorage.setItem(state);
    },
    changeDescription: (state, action: PayloadAction<{value: FormDescription}>) => {
      const {value} = action.payload;
      state.description = value;

      formPostStateStorage.setItem(state);
    },

    selectQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const newQuestions = state.questions.map((question, idx) =>
        idx === questionIdx
          ? {...question, isSelected: true}
          : {
              ...question,
              isSelected: false,
            }
      );
      state.questions = newQuestions;

      formPostStateStorage.setItem(state);
    },

    addQuestion: state => {
      const targetIdx = state.questions.findIndex(question => question.isSelected === true) + 1;
      resetQuestionSelection(state);
      state.questions.splice(targetIdx, 0, initialQuestion);

      formPostStateStorage.setItem(state);
    },

    deleteQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const nextSelectedQuestionIdx = questionIdx === 0 ? 1 : questionIdx - 1;

      resetQuestionSelection(state);
      // 남은 질문이 하나 이상인 경우 자동 선택 될 질문지
      if (state.questions.length > 1) {
        state.questions[nextSelectedQuestionIdx].isSelected = true;
      }

      state.questions.splice(questionIdx, 1);
      formPostStateStorage.setItem(state);
    },

    duplicateQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const {questions} = state;

      const targetIdx = questionIdx + 1;
      state.questions.splice(targetIdx, 0, questions[questionIdx]);

      resetQuestionSelection(state);
      state.questions[targetIdx].isSelected = true;

      formPostStateStorage.setItem(state);
    },

    toggleRequired: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const newIsRequired = !state.questions[questionIdx].isRequired;
      state.questions[questionIdx].isRequired = newIsRequired;

      formPostStateStorage.setItem(state);
    },

    resortQuestions: (state, action: PayloadAction<{questions: Question[]}>) => {
      const {questions} = action.payload;
      state.questions = questions;

      formPostStateStorage.setItem(state);
    },

    changeQuestionTitle: (
      state,
      action: PayloadAction<{questionIdx: number; value: QuestionTitle}>
    ) => {
      const {questionIdx, value} = action.payload;
      state.questions[questionIdx].title = value;

      formPostStateStorage.setItem(state);
    },

    changeQuestionType: (
      state,
      action: PayloadAction<{questionIdx: number; value: QuestionType}>
    ) => {
      const {questionIdx, value} = action.payload;
      const isOtherOptionSelectable =
        value === QUESTION_TYPES.multipleChoice || value === QUESTION_TYPES.checkboxes;

      if (!isOtherOptionSelectable) {
        state.questions[questionIdx].isOtherSelected = false;
      }

      state.questions[questionIdx].type = value;
      formPostStateStorage.setItem(state);
    },

    addQuestionOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const newOptionLength = state.questions[questionIdx].options.length + 1;
      const newOptionValue = `${DEFAULT_VALUES.QUESTION_OPTION} ${newOptionLength}`;

      state.questions[questionIdx].options.push(newOptionValue);

      formPostStateStorage.setItem(state);
    },

    removeQuestionOption: (
      state,
      action: PayloadAction<{questionIdx: number; optionIdx: number}>
    ) => {
      const {questionIdx, optionIdx} = action.payload;
      state.questions[questionIdx].options.splice(optionIdx, 1);

      formPostStateStorage.setItem(state);
    },

    addOtherOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      state.questions[questionIdx].isOtherSelected = true;

      formPostStateStorage.setItem(state);
    },

    removeOtherOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      state.questions[questionIdx].isOtherSelected = false;

      formPostStateStorage.setItem(state);
    },

    changeOptionValue: (
      state,
      action: PayloadAction<{questionIdx: number; optionIdx: number; value: OptionType}>
    ) => {
      const {questionIdx, optionIdx, value} = action.payload;
      state.questions[questionIdx].options[optionIdx] = value;

      formPostStateStorage.setItem(state);
    },

    resortQuestionOptions: (
      state,
      action: PayloadAction<{questionIdx: number; options: OptionType[]}>
    ) => {
      const {options, questionIdx} = action.payload;
      state.questions[questionIdx].options = options;

      formPostStateStorage.setItem(state);
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
} = surveyPostSlice.actions;
export default surveyPostSlice.reducer;
