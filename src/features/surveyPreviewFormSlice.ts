import {createSlice} from '@reduxjs/toolkit';
import {AnswerCheckboxes, AnswerMultipleChoice, PreviewQuestionForm} from '../interface/Form';
import {formStateStorage} from '../store/localStorage';
import {surveyPostFormToPrevFormState} from '../utils/formStateConverter';

const initialState: PreviewQuestionForm = surveyPostFormToPrevFormState(formStateStorage.getItem());

const surveyPreviewFormSlice = createSlice({
  name: 'questionForm',
  initialState,
  reducers: {
    changeMultipleOption: (
      state,
      action: {payload: {questionIdx: number; selectedIdx: number}}
    ) => {
      const {questionIdx, selectedIdx} = action.payload;
      if (
        'selectedOptionIndex' in state.questions[questionIdx].answer &&
        'other' in state.questions[questionIdx].answer
      ) {
        (state.questions[questionIdx].answer as AnswerMultipleChoice).selectedOptionIndex =
          selectedIdx;
      }
    },
    toggleCheckboxOption: (state, action: {payload: {questionIdx: number; optionIdx: number}}) => {
      const {questionIdx, optionIdx} = action.payload;

      if (
        'selectedOptionIndexes' in state.questions[questionIdx].answer &&
        'other' in state.questions[questionIdx].answer
      ) {
        const currentAnswer = state.questions[questionIdx].answer as AnswerCheckboxes;

        const currentSelects = currentAnswer.selectedOptionIndexes;

        if (currentSelects && currentSelects.includes(optionIdx)) {
          (state.questions[questionIdx].answer as AnswerCheckboxes).selectedOptionIndexes =
            currentSelects.filter(index => index !== optionIdx);
        } else {
          (state.questions[questionIdx].answer as AnswerCheckboxes).selectedOptionIndexes =
            currentSelects ? [...currentSelects, optionIdx] : [optionIdx];
        }
      }
    },
  },
});

export const {changeMultipleOption, toggleCheckboxOption} = surveyPreviewFormSlice.actions;
export default surveyPreviewFormSlice.reducer;
