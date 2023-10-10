import {createSlice} from '@reduxjs/toolkit';
import {PreviewQuestionForm} from '../interface/Form';
import {formPreviewStateStorage} from '../store/localStorage';

const cachedState = formPreviewStateStorage.getItem();
const initialState: PreviewQuestionForm = cachedState || {
  title: '',
  description: '',
  questions: [],
};

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
