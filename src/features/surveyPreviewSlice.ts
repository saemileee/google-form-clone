import {createSlice} from '@reduxjs/toolkit';
import {ShortAnswer, SurveyPreviewForm} from '../interface/Form';
import {formBuilderStateStorage, formResultStateStorage} from '../store/localStorage';
import {isValidString} from '../utils/formValidations';
import {getTargetOptionIdx, getTargetQuestionIdx} from './utils';
import {QUESTION_TYPES} from '../constants/Form';
import {initialSurveyForm} from './initialForms';

const previewSurveyForm = formBuilderStateStorage.getItem() || initialSurveyForm;

export const initialState: SurveyPreviewForm = {
  ...previewSurveyForm,
  invalidQuestions: [],
  submitTryCount: 0,
};

const switchToValid = (state: SurveyPreviewForm, questionId: string) => {
  state.invalidQuestions = state.invalidQuestions.filter(id => questionId !== id);
};

const surveyPreviewSlice = createSlice({
  name: 'surveyPreviewSlice',
  initialState,
  reducers: {
    toggleMultipleOption: (
      state,
      action: {
        payload: {questionId: string; selectedId: string};
      }
    ) => {
      const {questionId, selectedId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetQuestionIdx];

      if ('options' in targetQuestion) {
        const targetOptionIdx = getTargetOptionIdx(state, questionId, selectedId);
        const isOptionSelected =
          targetOptionIdx !== undefined && targetQuestion.options[targetOptionIdx].isSelected;

        if (isOptionSelected) {
          targetQuestion.options.forEach(option => (option.isSelected = false));
        } else {
          targetQuestion.options.forEach(option =>
            option.id === selectedId ? (option.isSelected = true) : (option.isSelected = false)
          );
        }

        if ('other' in targetQuestion) {
          targetQuestion.other.isSelected = false;
          switchToValid(state, questionId);
        }
      }
    },

    toggleCheckboxOption: (state, action: {payload: {questionId: string; selectedId: string}}) => {
      const {questionId, selectedId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetQuestionIdx];

      if ('options' in targetQuestion) {
        targetQuestion.options.forEach(option =>
          option.id === selectedId ? (option.isSelected = !option.isSelected) : null
        );
      }
    },

    toggleOtherOption: (state, action: {payload: {questionId: string}}) => {
      const {questionId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetQuestionIdx];

      if ('other' in targetQuestion) {
        const questionType = targetQuestion.type;
        if (questionType === QUESTION_TYPES.multipleChoice) {
          const isOtherSelected = targetQuestion.other.isSelected;
          if (!isOtherSelected) {
            targetQuestion.options.forEach(option => (option.isSelected = false));
          }
        }

        targetQuestion.other.isSelected = !targetQuestion.other.isSelected;
        switchToValid(state, questionId);
      }
    },

    typeOtherOption: (state, action: {payload: {questionId: string; value: string}}) => {
      const {questionId, value} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetQuestionIdx];

      if ('options' in targetQuestion && 'other' in targetQuestion) {
        const questionType = targetQuestion.type;
        if (questionType === QUESTION_TYPES.multipleChoice) {
          targetQuestion.options.forEach(option => (option.isSelected = false));
        }

        targetQuestion.other.isSelected = true;
        targetQuestion.other.value = value;

        switchToValid(state, questionId);
      }
    },

    selectDropDownOption: (
      state,
      action: {
        payload: {questionId: string; selectedId: string};
      }
    ) => {
      const {questionId, selectedId} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetQuestionIdx];

      if ('options' in targetQuestion) {
        targetQuestion.options.forEach(option =>
          option.id === selectedId ? (option.isSelected = true) : (option.isSelected = false)
        );
      }
    },

    changeTextAnswer: (state, action: {payload: {questionId: string; value: string}}) => {
      const {questionId, value} = action.payload;
      const targetQuestionIdx = getTargetQuestionIdx(state, questionId);
      const targetQuestion = state.questions[targetQuestionIdx];

      if ('answer' in targetQuestion) {
        (state.questions[targetQuestionIdx] as ShortAnswer).answer = value;
        if (isValidString(value)) {
          switchToValid(state, questionId);
        }
      }
    },

    setInvalidQuestions: (state, action: {payload: {invalidatedQuestionIds: string[]}}) => {
      const {invalidatedQuestionIds} = action.payload;
      state.invalidQuestions = invalidatedQuestionIds;
      state.submitTryCount += 1;
    },

    submitForm: state => {
      formResultStateStorage.setItem(state);
    },

    resetForm: state => {
      state.questions = initialState.questions;
      state.submitTryCount = initialState.submitTryCount;
      state.invalidQuestions = initialState.invalidQuestions;
    },
  },
});

export const {
  toggleMultipleOption,
  toggleCheckboxOption,
  selectDropDownOption,
  changeTextAnswer,
  toggleOtherOption,
  typeOtherOption,
  resetForm,
  setInvalidQuestions,
  submitForm,
} = surveyPreviewSlice.actions;
export default surveyPreviewSlice.reducer;
