import {QUESTION_TYPES} from '../constants/Form';
import {
  Checkboxes,
  DropDown,
  MultipleChoice,
  Paragraph,
  Question,
  ShortAnswer,
} from '../interface/Form';

export const isValidString = (value: string) => {
  return value.trim() ? true : false;
};

const isMultipleChoiceFilled = (multipleChoiceQuestion: MultipleChoice) => {
  const {options, other} = multipleChoiceQuestion;

  const isOptionSelected = options.some(option => option.isSelected);

  if (isOptionSelected) {
    return true;
  }

  if (other.isSelected && other.value && isValidString(other.value)) {
    return true;
  }
  return false;
};

const areCheckboxesFilled = (checkboxesQuestion: Checkboxes) => {
  const {options, other} = checkboxesQuestion;

  const isOptionSelected = options.some(option => option.isSelected);

  if (isOptionSelected) {
    return true;
  }

  if (other.isSelected && other.value && isValidString(other.value)) {
    return true;
  }
  return false;
};

const isDropDownFilled = (dropDownQuestion: DropDown) => {
  return dropDownQuestion.options.some(option => option.isSelected);
};

const isTextAnswerFilled = (question: ShortAnswer | Paragraph) => {
  return isValidString(question.answer);
};

export const getUnfilledRequiredIds = (questions: Question[]) => {
  const unfilledQuestionIds: string[] = [];
  questions.forEach(question => {
    if (question.isRequired) {
      switch (question.type) {
        case QUESTION_TYPES.multipleChoice:
          return (
            !isMultipleChoiceFilled(question as MultipleChoice) &&
            unfilledQuestionIds.push(question.id)
          );
        case QUESTION_TYPES.checkboxes:
          return (
            !areCheckboxesFilled(question as Checkboxes) && unfilledQuestionIds.push(question.id)
          );
        case QUESTION_TYPES.dropDown:
          return !isDropDownFilled(question as DropDown) && unfilledQuestionIds.push(question.id);
        case QUESTION_TYPES.shortAnswer:
          return (
            !isTextAnswerFilled(question as ShortAnswer) && unfilledQuestionIds.push(question.id)
          );
        case QUESTION_TYPES.paragraph:
          return (
            !isTextAnswerFilled(question as Paragraph) && unfilledQuestionIds.push(question.id)
          );
      }
    }
  });

  return unfilledQuestionIds;
};
