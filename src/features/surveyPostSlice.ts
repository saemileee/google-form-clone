import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {DEFAULT_VALUES, ID_PREFIX} from '../constants/Form';
import {
  FormDescription,
  FormTitle,
  QuestionTitle,
  QuestionType,
  OptionType,
  SurveyForm,
  MultipleChoice,
  Question,
  Option,
} from '../interface/Form';
import {formPostStateStorage} from '../store/localStorage';

const createQuestionId = (currentQuestionLength: number) => {
  return `${ID_PREFIX.QUESTION}-${currentQuestionLength + 1}`;
};

const createOptionId = (currentQuestionLength: number) => {
  return `${ID_PREFIX.OPTION}-${currentQuestionLength + 1}`;
};

const initialOption: Option = {
  id: createOptionId(0),
  value: '',
  isSelected: false,
};
const initialQuestion: MultipleChoice = {
  id: createQuestionId(0),
  isFocused: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: DEFAULT_VALUES.QUESTION_TYPE,
  options: [
    {id: `${ID_PREFIX.OPTION}-1`, value: `${DEFAULT_VALUES.QUESTION_OPTION} 1`, isSelected: false},
  ],
  isOtherSelected: false,
  isRequired: false,
  other: '',
};

export const initialSurveyForm: SurveyForm = {
  title: DEFAULT_VALUES.TITLE,
  description: '',
  questions: [initialQuestion],
};

const cachedSurveyForm = formPostStateStorage.getItem();

export const initialState: SurveyForm = cachedSurveyForm || initialSurveyForm;

const resetQuestionSelection = (state: SurveyForm) => {
  const newQuestions = state.questions.map(question => ({
    ...question,
    isFocused: false,
  }));
  state.questions = newQuestions;
};

const surveyPostSlice = createSlice({
  name: 'surveyPostSlice',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<{value: FormTitle}>) => {
      const {value} = action.payload;
      state.title = value;

      formPostStateStorage.setItem(state);
    },
    changeDescription: (state, action: PayloadAction<{value: FormDescription}>) => {
      const {value} = action.payload;
      state.description = value;

      formPostStateStorage.setItem(state);
    },

    focusQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const newQuestions = state.questions.map((question, idx) =>
        idx === questionIdx
          ? {...question, isFocused: true}
          : {
              ...question,
              isFocused: false,
            }
      );
      state.questions = newQuestions;

      formPostStateStorage.setItem(state);
    },

    addQuestion: state => {
      const questions = state.questions;
      const targetIdx = questions.findIndex(question => question.isFocused === true) + 1;
      resetQuestionSelection(state);
      state.questions.splice(targetIdx, 0, {
        ...initialQuestion,
        id: createQuestionId(state.questions.length),
      });

      formPostStateStorage.setItem(state);
    },

    deleteQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const questions = state.questions;
      const nextSelectedQuestionIdx = questionIdx === 0 ? 1 : questionIdx - 1;

      resetQuestionSelection(state);
      // 남은 질문이 하나 이상인 경우 자동 선택 될 질문지
      if (questions.length > 1) {
        questions[nextSelectedQuestionIdx].isFocused = true;
      }

      state.questions.splice(questionIdx, 1);
      formPostStateStorage.setItem(state);
    },

    duplicateQuestion: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const targetQuestion = state.questions[questionIdx];

      const targetIdx = questionIdx + 1;
      state.questions.splice(targetIdx, 0, targetQuestion);

      resetQuestionSelection(state);
      targetQuestion.isFocused = true;

      formPostStateStorage.setItem(state);
    },

    toggleRequired: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const targetQuestion = state.questions[questionIdx];

      const newIsRequired = !targetQuestion.isRequired;
      targetQuestion.isRequired = newIsRequired;

      formPostStateStorage.setItem(state);
    },

    resortQuestions: (state, action: PayloadAction<{questions: Question[]}>) => {
      const {questions} = action.payload;
      state.questions = questions;

      formPostStateStorage.setItem(state);
    },

    changeQuestionTitle: (
      state,
      action: PayloadAction<{questionIdx: number; value: QuestionTitle}>
    ) => {
      const {questionIdx, value} = action.payload;
      state.questions[questionIdx].title = value;

      formPostStateStorage.setItem(state);
    },

    changeQuestionType: (
      state,
      action: PayloadAction<{questionIdx: number; value: QuestionType}>
    ) => {
      const {questionIdx, value} = action.payload;

      const targetQuestion = state.questions[questionIdx];
      if ('isOtherSelected' in targetQuestion) {
        targetQuestion.isOtherSelected = false;
        targetQuestion.type = value;
        formPostStateStorage.setItem(state);
      }
    },

    addQuestionOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const targetQuestion = state.questions[questionIdx];

      if ('options' in targetQuestion) {
        const optionLength = targetQuestion.options.length;
        const newOption = {
          ...initialOption,
          id: createOptionId(optionLength),
          value: `${DEFAULT_VALUES.QUESTION_OPTION} ${optionLength + 1}`,
        };

        targetQuestion.options.push(newOption);
        formPostStateStorage.setItem(state);
      }
    },

    removeQuestionOption: (
      state,
      action: PayloadAction<{questionIdx: number; optionIdx: number}>
    ) => {
      const {questionIdx, optionIdx} = action.payload;

      const targetQuestion = state.questions[questionIdx];
      if ('options' in targetQuestion) {
        targetQuestion.options.splice(optionIdx, 1);
        formPostStateStorage.setItem(state);
      }
    },

    addOtherOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const targetQuestion = state.questions[questionIdx];

      if ('isOtherSelected' in targetQuestion) {
        targetQuestion.isOtherSelected = true;
        formPostStateStorage.setItem(state);
      }
    },

    removeOtherOption: (state, action: PayloadAction<{questionIdx: number}>) => {
      const {questionIdx} = action.payload;
      const targetQuestion = state.questions[questionIdx];
      if ('isOtherSelected' in targetQuestion) {
        targetQuestion.isOtherSelected = false;
        formPostStateStorage.setItem(state);
      }
    },

    changeOptionValue: (
      state,
      action: PayloadAction<{questionIdx: number; optionIdx: number; value: OptionType}>
    ) => {
      const {questionIdx, optionIdx, value} = action.payload;
      const targetQuestion = state.questions[questionIdx];
      if ('options' in targetQuestion) {
        targetQuestion.options[optionIdx].value = value;
        formPostStateStorage.setItem(state);
      }
    },

    resortQuestionOptions: (
      state,
      action: PayloadAction<{questionIdx: number; options: Option[]}>
    ) => {
      const {options, questionIdx} = action.payload;
      const targetQuestion = state.questions[questionIdx];
      if ('options' in targetQuestion) {
        targetQuestion.options = options;
        formPostStateStorage.setItem(state);
      }
    },
  },
});

export const {
  changeTitle,
  changeDescription,

  changeQuestionTitle,
  changeQuestionType,

  focusQuestion,
  addQuestion,
  deleteQuestion,
  duplicateQuestion,
  toggleRequired,
  resortQuestions,

  addQuestionOption,
  removeQuestionOption,
  addOtherOption,
  removeOtherOption,

  changeOptionValue,
  resortQuestionOptions,
} = surveyPostSlice.actions;
export default surveyPostSlice.reducer;
