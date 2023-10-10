import {configureStore} from '@reduxjs/toolkit';
import questionFormReducer from '../features/surveyPostSlice';
import surveyPreviewFormSlice from '../features/surveyPreviewFormSlice';

export const store = configureStore({
  reducer: {
    questionForm: questionFormReducer,
    surveyPreviewForm: surveyPreviewFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
