import {createSlice} from '@reduxjs/toolkit';
import {AnswerDropDown, AnswerMultipleChoice, PreviewQuestionForm} from '../interface/Form';
import {formStateStorage} from '../store/localStorage';
import {surveyPostFormToPrevFormState} from '../utils/formStateConverter';
import {OTHER_IDX} from '../constants/Form';

const initialState: PreviewQuestionForm = surveyPostFormToPrevFormState(formStateStorage.getItem());

const surveyPreviewFormSlice = createSlice({
  name: 'questionForm',
  initialState,
  reducers: {
    toggleMultipleOption: (
      state,
      action: {
        payload: {questionIdx: number; selectedIdx: AnswerMultipleChoice['selectedOptionIndex']};
      }
    ) => {
      const {questionIdx, selectedIdx} = action.payload;
      const currentSelect = state.questions[questionIdx].answer.multipleChoice!.selectedOptionIndex;
      if (selectedIdx === currentSelect) {
        state.questions[questionIdx].answer.multipleChoice!.selectedOptionIndex = null;
      } else {
        state.questions[questionIdx].answer.multipleChoice!.selectedOptionIndex = selectedIdx;
      }
    },
    toggleCheckboxOption: (
      state,
      action: {payload: {questionIdx: number; selectedIdx: number | typeof OTHER_IDX}}
    ) => {
      const {questionIdx, selectedIdx} = action.payload;

      const currentSelects = state.questions[questionIdx].answer.checkboxes!.selectedOptionIndexes;

      if (currentSelects.includes(selectedIdx)) {
        state.questions[questionIdx].answer.checkboxes!.selectedOptionIndexes =
          currentSelects.filter(select => select !== selectedIdx);
      } else {
        state.questions[questionIdx].answer.checkboxes!.selectedOptionIndexes = [
          ...currentSelects,
          selectedIdx,
        ];
      }
    },
    selectDropDownOption: (
      state,
      action: {
        payload: {questionIdx: number; selectedIdx: AnswerDropDown['selectedOptionIndex']};
      }
    ) => {
      const {questionIdx, selectedIdx} = action.payload;
      state.questions[questionIdx].answer.multipleChoice!.selectedOptionIndex = selectedIdx;
    },

    changeTextAnswer: (state, action: {payload: {questionIdx: number; value: string}}) => {
      const {questionIdx, value} = action.payload;
      state.questions[questionIdx].answer.shortAnswer!.answer = value;
    },
  },
});

export const {toggleMultipleOption, toggleCheckboxOption, selectDropDownOption, changeTextAnswer} =
  surveyPreviewFormSlice.actions;
export default surveyPreviewFormSlice.reducer;
