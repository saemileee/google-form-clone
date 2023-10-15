import {configureStore} from '@reduxjs/toolkit';
import surveyBuilderSlice from '../features/surveyBuilderSlice';
import surveyPreviewSlice from '../features/surveyPreviewSlice';

export const store = configureStore({
  reducer: {
    surveyBuilder: surveyBuilderSlice,
    surveyPreview: surveyPreviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
