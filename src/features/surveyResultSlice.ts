import {createSlice} from '@reduxjs/toolkit';
import {PreviewQuestionForm} from '../interface/Form';

const initialState: PreviewQuestionForm = {title: '', description: '', questions: []};

const surveyResultSlice = createSlice({
  name: 'questionForm',
  initialState,
  reducers: {
    setResultFormState: (state, action: {payload: {form: PreviewQuestionForm}}) => {
      state = action.payload.form;
    },
  },
});

export const {setResultFormState} = surveyResultSlice.actions;
export default surveyResultSlice.reducer;
