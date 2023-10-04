import {configureStore} from '@reduxjs/toolkit';
import questionFormReducer from '../features/questionFormSlice';

export const store = configureStore({
    reducer: {
        questionForm: questionFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
