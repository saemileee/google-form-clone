import {configureStore} from '@reduxjs/toolkit';
import surveyBuilderSlice from '../features/surveyBuilderSlice';
import surveyPreviewFormSlice from '../features/surveyPreviewFormSlice';

export const store = configureStore({
  reducer: {
    surveyBuilder: surveyBuilderSlice,
    surveyPreview: surveyPreviewFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
