import {createSlice} from '@reduxjs/toolkit';
import {AnswerDropDown, AnswerMultipleChoice, PreviewQuestionForm} from '../interface/Form';
import {surveyPostFormToPrevFormState} from '../utils/formStateConverter';
import {OTHER_IDX, QUESTION_TYPES} from '../constants/Form';
import {initialState as postFormInitialState} from './surveyPostSlice';
import {formResultStateStorage} from '../store/localStorage';

const initialState: PreviewQuestionForm = surveyPostFormToPrevFormState(postFormInitialState);

const initialMultipleChoiceAnswer = {
  selectedOptionIndex: null,
  other: null,
};

const initialCheckboxesAnswer = {
  selectedOptionIndexes: [],
  other: null,
};

const surveyPreviewFormSlice = createSlice({
  name: 'surveyPreviewForm',
  initialState,
  reducers: {
    toggleMultipleOption: (
      state,
      action: {
        payload: {questionIdx: number; selectedIdx: AnswerMultipleChoice['selectedOptionIndex']};
      }
    ) => {
      const {questionIdx, selectedIdx} = action.payload;

      const currentSelect = (
        state.questions[questionIdx].answer.multipleChoice || initialMultipleChoiceAnswer
      ).selectedOptionIndex;

      if (selectedIdx === currentSelect) {
        (
          state.questions[questionIdx].answer.multipleChoice || initialMultipleChoiceAnswer
        ).selectedOptionIndex = null;
        return;
      }

      (
        state.questions[questionIdx].answer.multipleChoice || initialMultipleChoiceAnswer
      ).selectedOptionIndex = selectedIdx;
    },

    toggleCheckboxOption: (
      state,
      action: {payload: {questionIdx: number; selectedIdx: number | typeof OTHER_IDX}}
    ) => {
      const {questionIdx, selectedIdx} = action.payload;

      const currentSelects = (
        state.questions[questionIdx].answer.checkboxes || initialCheckboxesAnswer
      ).selectedOptionIndexes;

      if (currentSelects.includes(selectedIdx)) {
        (
          state.questions[questionIdx].answer.checkboxes || initialCheckboxesAnswer
        ).selectedOptionIndexes = currentSelects.filter(select => select !== selectedIdx);
      } else {
        (
          state.questions[questionIdx].answer.checkboxes || initialCheckboxesAnswer
        ).selectedOptionIndexes = [...currentSelects, selectedIdx];
      }
    },

    selectDropDownOption: (
      state,
      action: {
        payload: {questionIdx: number; selectedIdx: AnswerDropDown['selectedOptionIndex']};
      }
    ) => {
      const {questionIdx, selectedIdx} = action.payload;
      (
        state.questions[questionIdx].answer.dropDown || {
          selectedOptionIndex: null,
        }
      ).selectedOptionIndex = selectedIdx;
    },

    changeTextAnswer: (state, action: {payload: {questionIdx: number; value: string}}) => {
      const {questionIdx, value} = action.payload;
      const initialTextAnswer = {answer: ''};
      if (state.questions[questionIdx].layout.type === QUESTION_TYPES.shortAnswer) {
        (state.questions[questionIdx].answer.shortAnswer || initialTextAnswer).answer = value;
      } else if (state.questions[questionIdx].layout.type === QUESTION_TYPES.paragraph) {
        (state.questions[questionIdx].answer.paragraph || initialTextAnswer).answer = value;
      }
    },

    typeOtherOption: (state, action: {payload: {questionIdx: number; value: string}}) => {
      const {questionIdx, value} = action.payload;
      if (state.questions[questionIdx].layout.type === QUESTION_TYPES.multipleChoice) {
        (state.questions[questionIdx].answer.multipleChoice || initialMultipleChoiceAnswer).other =
          value;

        const currentSelected = (
          state.questions[questionIdx].answer.multipleChoice || initialMultipleChoiceAnswer
        ).selectedOptionIndex;
        if (currentSelected !== OTHER_IDX && value.length > 0) {
          (
            state.questions[questionIdx].answer.multipleChoice || initialMultipleChoiceAnswer
          ).selectedOptionIndex = OTHER_IDX;
        }
      }

      if (state.questions[questionIdx].layout.type === QUESTION_TYPES.checkboxes) {
        (state.questions[questionIdx].answer.checkboxes || initialCheckboxesAnswer).other = value;

        const currentSelected = (
          state.questions[questionIdx].answer.checkboxes || initialCheckboxesAnswer
        ).selectedOptionIndexes;

        if (!currentSelected.includes(OTHER_IDX) && value.length > 0) {
          (
            state.questions[questionIdx].answer.checkboxes || initialCheckboxesAnswer
          ).selectedOptionIndexes.push(OTHER_IDX);
        }
      }
    },

    resetForm: state => {
      state.questions = initialState.questions;
    },

    setInvalidatedQuestions: (state, action: {payload: {invalidatedQuestionIndexes: number[]}}) => {
      const {invalidatedQuestionIndexes} = action.payload;
      state.invalidatedQuestions = invalidatedQuestionIndexes;
    },

    submitForm: state => {
      formResultStateStorage.setItem(state);
    },
  },
});

export const {
  toggleMultipleOption,
  toggleCheckboxOption,
  selectDropDownOption,
  changeTextAnswer,
  typeOtherOption,
  resetForm,
  setInvalidatedQuestions,
  submitForm,
} = surveyPreviewFormSlice.actions;
export default surveyPreviewFormSlice.reducer;
