import uuid from 'react-uuid';
import {DEFAULT_VALUES, QUESTION_TYPES} from '../constants/Form';
import {
  Option,
  MultipleChoice,
  SurveyForm,
  Checkboxes,
  DropDown,
  QuestionType,
} from '../interface/Form';

export const initialOption: Option = {
  id: uuid(),
  value: `${DEFAULT_VALUES.QUESTION_OPTION} 1`,
  isSelected: false,
};

export const initialOther = {
  isFormActive: false,
  isSelected: false,
  value: '',
};

export const initialMultipleChoice: MultipleChoice = {
  id: uuid(),
  isFocused: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: QUESTION_TYPES.multipleChoice as QuestionType,
  options: [initialOption],
  other: initialOther,
  isRequired: false,
};

export const initialCheckboxes: Checkboxes = {
  id: uuid(),
  isFocused: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: QUESTION_TYPES.checkboxes as QuestionType,
  options: [initialOption],
  other: initialOther,
  isRequired: false,
};

export const initialDropDown: DropDown = {
  id: uuid(),
  isFocused: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: QUESTION_TYPES.dropDown as QuestionType,
  options: [initialOption],
  isRequired: false,
};

export const initialShortAnswer = {
  id: uuid(),
  isFocused: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: QUESTION_TYPES.shortAnswer,
  answer: '',
  isRequired: false,
};

export const initialParagraph = {
  id: uuid(),
  isFocused: true,
  title: DEFAULT_VALUES.QUESTION_TITLE,
  type: QUESTION_TYPES.paragraph,
  answer: '',
  isRequired: false,
};

export const initialQuestion = initialMultipleChoice;

export const initialSurveyForm: SurveyForm = {
  title: DEFAULT_VALUES.TITLE,
  description: '',
  questions: [initialQuestion],
  timer: null,
  saveTime: null,
};
