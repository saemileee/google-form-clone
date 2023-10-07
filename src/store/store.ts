import {configureStore} from '@reduxjs/toolkit';
import questionFormReducer from '../features/questionFormSlice';
import surveyPreviewFormSlice from '../features/surveyPreviewFormSlice';
import surveyResultSlice from '../features/surveyResultSlice';

export const store = configureStore({
  reducer: {
    questionForm: questionFormReducer,
    surveyPreviewForm: surveyPreviewFormSlice,
    surveyResult: surveyResultSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
