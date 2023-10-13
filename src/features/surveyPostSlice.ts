import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES} from '../constants/Form';
import {
  FormDescription,
  FormTitle,
  QuestionTitle,
  QuestionType,
  SurveyForm,
  Question,
  Option,
  OptionalQuestion,
} from '../interface/Form';
import {formPostStateStorage} from '../store/localStorage';
import uuid from 'react-uuid';
import {
  resetQuestionSelection,
  getTargetQuestionIdx,
  getTargetOptionIdx,
  convertQuestionForm,
} from './utils';
import {initialSurveyForm, initialQuestion, initialOption} from './initialForms';

const cachedSurveyForm = formPostStateStorage.getItem();

export const initialState: SurveyForm = cachedSurveyForm || initialSurveyForm;

const surveyPostSlice = createSlice({
  name: 'surveyPostSlice',
  initialState,
  reducers: {
    // NOTE: BasicInfo
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

    // NOTE: Question
    focusQuestion: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const newQuestions = state.questions.map(question =>
        question.id === questionId
          ? {...question, isFocused: true}
          : {
              ...question,
              isFocused: false,
            }
      );
      state.questions = newQuestions;

      formPostStateStorage.setItem(state);
    },

    addQuestion: state => {
      const questions = state.questions;
      const targetIdx = questions.findIndex(question => question.isFocused === true) + 1;
      resetQuestionSelection(state);
      state.questions.splice(targetIdx, 0, {
        ...initialQuestion,
        id: uuid(),
        options: [{...initialOption, id: uuid()}],
      });

      formPostStateStorage.setItem(state);
    },

    deleteQuestion: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const questions = state.questions;
      const questionIdx = questions.findIndex(question => question.id === questionId);
      const nextSelectedQuestionIdx = questionIdx === 0 ? 1 : questionIdx - 1;

      resetQuestionSelection(state);
      // NOTE: 남은 질문이 하나 이상인 경우 자동 선택 될 질문지
      if (questions.length > 1) {
        state.questions[nextSelectedQuestionIdx].isFocused = true;
      }

      state.questions.splice(questionIdx, 1);
      formPostStateStorage.setItem(state);
    },

    duplicateQuestion: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const targetIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetIdx];

      const newQuestionId = uuid();
      if ('options' in targetQuestion) {
        const newOptions = targetQuestion.options.map(option => ({
          ...option,
          id: uuid(),
        }));
        const newQuestion = {...targetQuestion, id: newQuestionId, options: newOptions};
        state.questions.splice(targetIdx, 0, newQuestion);
      } else {
        const newQuestion = {...targetQuestion, id: newQuestionId};
        state.questions.splice(targetIdx, 0, newQuestion);
      }

      resetQuestionSelection(state);
      state.questions[targetIdx].isFocused = false;
      formPostStateStorage.setItem(state);
    },

    toggleRequired: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const targetIdx = getTargetQuestionIdx(state, questionId);

      const questionIdx = targetIdx;
      const isRequired = !state.questions[targetIdx].isRequired;

      state.questions[questionIdx].isRequired = isRequired;
      formPostStateStorage.setItem(state);
    },

    resortQuestions: (state, action: PayloadAction<{questions: Question[]}>) => {
      const {questions} = action.payload;
      state.questions = questions;

      formPostStateStorage.setItem(state);
    },

    changeQuestionTitle: (
      state,
      action: PayloadAction<{questionId: string; value: QuestionTitle}>
    ) => {
      const {questionId, value} = action.payload;
      const targetIdx = getTargetQuestionIdx(state, questionId);

      state.questions[targetIdx].title = value;
      formPostStateStorage.setItem(state);
    },

    changeQuestionType: (
      state,
      action: PayloadAction<{questionId: string; value: QuestionType}>
    ) => {
      const {questionId, value} = action.payload;
      const targetIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetIdx];
      const newQuestion = convertQuestionForm(targetQuestion, value);
      console.info({newQuestion});
      state.questions[targetIdx] = newQuestion;
    },

    // NOTE: Question-Option
    addQuestionOption: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetQuestionIdx];

      if ('options' in targetQuestion) {
        const optionLength = targetQuestion.options.length;
        const newOption = {
          ...initialOption,
          id: uuid(),
          value: `${DEFAULT_VALUES.QUESTION_OPTION} ${optionLength + 1}`,
        };

        targetQuestion.options.push(newOption);
        formPostStateStorage.setItem(state);
      }
    },

    removeQuestionOption: (
      state,
      action: PayloadAction<{questionId: string; optionId: string}>
    ) => {
      const {questionId, optionId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetQuestionIdx];
      if ('options' in targetQuestion) {
        (state.questions[targetQuestionIdx] as OptionalQuestion).options =
          targetQuestion.options.filter(option => option.id !== optionId);
        formPostStateStorage.setItem(state);
      }
    },

    addOtherOption: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetQuestionIdx];

      if ('other' in targetQuestion) {
        targetQuestion.other.isFormActive = true;
        formPostStateStorage.setItem(state);
      }
    },

    removeOtherOption: (state, action: PayloadAction<{questionId: string}>) => {
      const {questionId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetQuestionIdx];
      if ('other' in targetQuestion) {
        targetQuestion.other.isFormActive = false;
        formPostStateStorage.setItem(state);
      }
    },

    changeOptionValue: (
      state,
      action: PayloadAction<{questionId: string; optionId: string; value: string}>
    ) => {
      const {questionId, optionId, value} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetQuestionIdx];
      const targetOptionIdx = getTargetOptionIdx(state, questionId, optionId);

      if ('options' in targetQuestion && targetOptionIdx !== undefined) {
        targetQuestion.options[targetOptionIdx].value = value;
        formPostStateStorage.setItem(state);
      }
    },

    resortQuestionOptions: (
      state,
      action: PayloadAction<{questionId: string; options: Option[]}>
    ) => {
      const {options, questionId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);

      const targetQuestion = state.questions[targetQuestionIdx];
      if ('options' in targetQuestion) {
        targetQuestion.options = options;
        formPostStateStorage.setItem(state);
      }
    },
  },
});

export const {
  changeTitle,
  changeDescription,

  changeQuestionTitle,
  changeQuestionType,

  focusQuestion,
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
