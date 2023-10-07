import {createSlice} from '@reduxjs/toolkit';
import {
  AnswerCheckboxes,
  AnswerDropDown,
  AnswerMultipleChoice,
  AnswerTextAnswer,
  PreviewQuestionForm,
} from '../interface/Form';
import {formStateStorage} from '../store/localStorage';
import {surveyPostFormToPrevFormState} from '../utils/formStateConverter';

const initialState: PreviewQuestionForm = surveyPostFormToPrevFormState(formStateStorage.getItem());

const surveyPreviewFormSlice = createSlice({
  name: 'questionForm',
  initialState,
  reducers: {
    changeMultipleOption: (
      state,
      action: {payload: {questionIdx: number; selectedIdx: number | null; isOtherOption: boolean}}
    ) => {
      const {questionIdx, selectedIdx, isOtherOption} = action.payload;
      if (
        'selectedOptionIndex' in state.questions[questionIdx].answer &&
        'other' in state.questions[questionIdx].answer
      ) {
        const currentSelect = (state.questions[questionIdx].answer as AnswerMultipleChoice)
          .selectedOptionIndex;
        if (selectedIdx !== currentSelect) {
          (state.questions[questionIdx].answer as AnswerMultipleChoice).selectedOptionIndex =
            selectedIdx;
        } else {
          (state.questions[questionIdx].answer as AnswerMultipleChoice).selectedOptionIndex = null;

          const currentIsOtherOption = (state.questions[questionIdx].answer as AnswerMultipleChoice)
            .isOtherSelected;
          if (isOtherOption) {
            (state.questions[questionIdx].answer as AnswerMultipleChoice).isOtherSelected =
              !currentIsOtherOption;
          }
        }
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
    changeDropdownOption: (
      state,
      action: {payload: {questionIdx: number; selectedIdx: number | null}}
    ) => {
      const {questionIdx, selectedIdx} = action.payload;
      (state.questions[questionIdx].answer as AnswerDropDown).selectedOptionIndex = selectedIdx;
    },
    changeTextAnswer: (state, action: {payload: {questionIdx: number; value: string}}) => {
      const {questionIdx, value} = action.payload;
      (state.questions[questionIdx].answer as AnswerTextAnswer).answer = value;
    },
  },
});

export const {changeMultipleOption, toggleCheckboxOption, changeDropdownOption, changeTextAnswer} =
  surveyPreviewFormSlice.actions;
export default surveyPreviewFormSlice.reducer;
