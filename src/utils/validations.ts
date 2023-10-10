import {OTHER_IDX, QUESTION_TYPES} from '../constants/Form';
import {
  AnswerCheckboxes,
  AnswerDropDown,
  AnswerMultipleChoice,
  AnswerTextAnswer,
  PreviewQuestion,
} from '../interface/Form';

const isValidateString = (value: string) => {
  return value.trim() ? true : false;
};

const isMultipleChoiceFilled = (multipleChoiceAnswer: AnswerMultipleChoice) => {
  const {selectedOptionIndex, other} = multipleChoiceAnswer;

  if (Number.isInteger(selectedOptionIndex)) {
    return true;
  }

  if (selectedOptionIndex === OTHER_IDX && other && isValidateString(other)) {
    return true;
  }
  return false;
};

const areCheckboxesFilled = (checkboxesAnswer: AnswerCheckboxes) => {
  const {selectedOptionIndexes, other} = checkboxesAnswer;
  const onlyNumbers = selectedOptionIndexes.filter(index => Number.isInteger(index));
  const isOnlyOtherChecked =
    selectedOptionIndexes.includes(OTHER_IDX) && selectedOptionIndexes.length === 1;

  if (onlyNumbers.length) {
    return true;
  }
  if (isOnlyOtherChecked && other && isValidateString(other)) {
    return true;
  }
  return false;
};

const isDropDownFilled = (dropDownAnswer: AnswerDropDown) => {
  return Number.isInteger(dropDownAnswer.selectedOptionIndex) ? true : false;
};

const isTextAnswerFilled = (answer: AnswerTextAnswer) => {
  return isValidateString(answer.answer);
};

export const getUnfilledRequiredIndexes = (questions: PreviewQuestion[]) => {
  const unfilledQuestionIndexes: number[] = [];
  questions.forEach((question, idx) => {
    if (question.layout.isRequired) {
      switch (question.layout.type) {
        case QUESTION_TYPES.multipleChoice:
          return (
            !isMultipleChoiceFilled(question.answer.multipleChoice!) &&
            unfilledQuestionIndexes.push(idx)
          );
        case QUESTION_TYPES.checkboxes:
          return (
            !areCheckboxesFilled(question.answer.checkboxes!) && unfilledQuestionIndexes.push(idx)
          );
        case QUESTION_TYPES.dropDown:
          return !isDropDownFilled(question.answer.dropDown!) && unfilledQuestionIndexes.push(idx);
        case QUESTION_TYPES.shortAnswer:
          return (
            !isTextAnswerFilled(question.answer.shortAnswer!) && unfilledQuestionIndexes.push(idx)
          );
        case QUESTION_TYPES.paragraph:
          return (
            !isTextAnswerFilled(question.answer.paragraph!) && unfilledQuestionIndexes.push(idx)
          );
      }
    }
  });

  return unfilledQuestionIndexes;
};
