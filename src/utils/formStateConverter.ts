import {QUESTION_TYPES} from '../constants/Form';
import {Form, PreviewQuestionForm, QuestionType} from '../interface/Form';

export const surveyPostFormToPrevFormState = (state: Form): PreviewQuestionForm => {
  const getInitialAnswer = (type: QuestionType) => {
    switch (type) {
      case QUESTION_TYPES.multipleChoice:
        return {multipleChoice: {selectedOptionIndex: null, other: null}};
      case QUESTION_TYPES.checkboxes:
        return {checkboxes: {selectedOptionIndexes: [], other: null}};

      case QUESTION_TYPES.dropDown:
        return {dropDown: {selectedOptionIndex: null}};
      case QUESTION_TYPES.shortAnswer:
        return {shortAnswer: {answer: ''}};

      case QUESTION_TYPES.paragraph:
        return {paragraph: {answer: ''}};
      default:
        return {paragraph: {answer: ''}};
    }
  };

  const newQuestions = state.questions.map(question => ({
    title: question.title,
    layout: {
      ...question,
      isSelected: false,
    },
    answer: getInitialAnswer(question.type),
  }));

  const previewFormState = {
    title: state.title,
    description: state.description,
    questions: newQuestions,
    invalidatedQuestions: [],
  };
  return previewFormState;
};
