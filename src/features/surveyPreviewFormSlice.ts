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
      console.info(action.payload);
      const {questionIdx, selectedIdx} = action.payload;
      state.questions[questionIdx].answer.dropDown!.selectedOptionIndex = selectedIdx;
    },

    changeTextAnswer: (state, action: {payload: {questionIdx: number; value: string}}) => {
      const {questionIdx, value} = action.payload;
      if (state.questions[questionIdx].answer.shortAnswer) {
        state.questions[questionIdx].answer.shortAnswer!.answer = value;
      } else if (state.questions[questionIdx].answer.paragraph) {
        state.questions[questionIdx].answer.paragraph!.answer = value;
      }
    },

    typeOtherOption: (state, action: {payload: {questionIdx: number; value: string}}) => {
      const {questionIdx, value} = action.payload;
      if (state.questions[questionIdx].answer.multipleChoice) {
        state.questions[questionIdx].answer.multipleChoice!.other = value;

        const currentSelected =
          state.questions[questionIdx].answer.multipleChoice!.selectedOptionIndex;
        if (currentSelected !== OTHER_IDX && value.length > 0) {
          state.questions[questionIdx].answer.multipleChoice!.selectedOptionIndex = OTHER_IDX;
        }
      }
      if (state.questions[questionIdx].answer.checkboxes) {
        state.questions[questionIdx].answer.checkboxes!.other = value;

        const currentSelected =
          state.questions[questionIdx].answer.checkboxes!.selectedOptionIndexes;
        if (!currentSelected.includes(OTHER_IDX) && value.length > 0) {
          state.questions[questionIdx].answer.checkboxes!.selectedOptionIndexes.push(OTHER_IDX);
        }
      }
    },
  },
});

export const {
  toggleMultipleOption,
  toggleCheckboxOption,
  selectDropDownOption,
  changeTextAnswer,
  typeOtherOption,
} = surveyPreviewFormSlice.actions;
export default surveyPreviewFormSlice.reducer;
