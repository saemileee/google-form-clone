import {QUESTION_TYPES} from '../constants/Form';
import {MultipleChoice, Question, QuestionType, SurveyForm} from '../interface/Form';
import {
  initialDropDown,
  initialMultipleChoice,
  initialOther,
  initialShortAnswer,
} from './initialForms';

export const resetQuestionSelection = (state: SurveyForm) => {
  const newQuestions = state.questions.map(question => ({
    ...question,
    isFocused: false,
  }));
  state.questions = newQuestions;
};

export const getTargetQuestionIdx = (state: SurveyForm, questionId: string) => {
  return state.questions.findIndex(question => question.id === questionId);
};

export const getTargetOptionIdx = (state: SurveyForm, questionId: string, optionId: string) => {
  const targetQuestion = state.questions.find(question => question.id === questionId);
  if (targetQuestion && 'options' in targetQuestion) {
    return targetQuestion.options.findIndex(option => option.id === optionId);
  }
};

export const convertQuestionForm = (question: Question, targetType: QuestionType): Question => {
  switch (question.type) {
    case QUESTION_TYPES.multipleChoice:
    case QUESTION_TYPES.checkboxes:
      {
        const {id, isFocused, title, isRequired, options} = question as MultipleChoice;

        switch (targetType) {
          case QUESTION_TYPES.multipleChoice:
          case QUESTION_TYPES.checkboxes:
            return {...question, type: targetType};
          case QUESTION_TYPES.dropDown: {
            const newQuestion = {
              ...initialDropDown,
              type: targetType,
              id,
              title,
              isRequired,
              isFocused,
              options,
            };
            return newQuestion;
          }
          case QUESTION_TYPES.shortAnswer:
          case QUESTION_TYPES.paragraph: {
            const newQuestion = {
              ...initialShortAnswer,
              type: targetType,
              id,
              title,
              isRequired,
              isFocused,
            };
            return newQuestion;
          }
        }
      }
      return question;

    case QUESTION_TYPES.dropDown: {
      const {id, isFocused, title, isRequired} = question;

      switch (targetType) {
        case QUESTION_TYPES.multipleChoice:
        case QUESTION_TYPES.checkboxes:
          return {...question, type: targetType, other: initialOther};
        case QUESTION_TYPES.shortAnswer:
        case QUESTION_TYPES.paragraph: {
          const newQuestion = {
            ...initialShortAnswer,
            type: targetType,
            id,
            title,
            isRequired,
            isFocused,
          };
          return newQuestion;
        }
      }
      return question;
    }

    case QUESTION_TYPES.shortAnswer:
    case QUESTION_TYPES.paragraph:
      {
        const {id, isFocused, title, isRequired} = question;

        switch (targetType) {
          case QUESTION_TYPES.multipleChoice:
          case QUESTION_TYPES.checkboxes:
            return {...initialMultipleChoice, type: targetType, id, isFocused, title, isRequired};
          case QUESTION_TYPES.dropDown:
            return {...initialDropDown, type: targetType, id, isFocused, title, isRequired};
          case QUESTION_TYPES.shortAnswer:
          case QUESTION_TYPES.paragraph:
            return {...question, type: targetType};
        }
      }
      return question;

    default:
      return question;
  }
};
