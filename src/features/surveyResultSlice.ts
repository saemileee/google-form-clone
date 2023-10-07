import {createSlice} from '@reduxjs/toolkit';
import {PreviewQuestionForm} from '../interface/Form';

const initialState: PreviewQuestionForm = {title: '', description: '', questions: []};

const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState,
  reducers: {
    submitFormData: (state, action: {payload: {form: PreviewQuestionForm}}) => {
      return {...action.payload.form};
    },
  },
});

export const {submitFormData} = surveyResultSlice.actions;
export default surveyResultSlice.reducer;