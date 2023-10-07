import {QUESTION_TYPES} from '../constants/Form';
import {Form, PreviewQuestionForm, QuestionType} from '../interface/Form';

export const surveyPostFormToPrevFormState = (state: Form): PreviewQuestionForm => {
  const getInitialAnswer = (type: QuestionType) => {
    switch (type) {
      case QUESTION_TYPES.multipleChoice:
        return {
          selectedOptionIndex: null,
          other: null,
        };
      case QUESTION_TYPES.checkboxes:
        return {selectedOptionIndexes: [], other: null};

      case QUESTION_TYPES.dropDown:
        return {selectedOptionIndex: null};
      case QUESTION_TYPES.shortAnswer:
        return {answer: null};

      case QUESTION_TYPES.paragraph:
        return {answer: null};
      default:
        return {answer: null};
    }
  };

  const newQuestions = {...state}.questions.map(question => ({
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
  };
  return previewFormState;
};
