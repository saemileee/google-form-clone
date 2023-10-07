import {createSlice} from '@reduxjs/toolkit';
import {AnswerMultipleChoice, PreviewQuestionForm} from '../interface/Form';
import {formStateStorage} from '../store/localStorage';
import {surveyPostFormToPrevFormState} from '../utils/formStateConverter';

const initialState: PreviewQuestionForm = surveyPostFormToPrevFormState(formStateStorage.getItem());
console.info(initialState);

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
  },
});

export const {changeMultipleOption} = surveyPreviewFormSlice.actions;
export default surveyPreviewFormSlice.reducer;
