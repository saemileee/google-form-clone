import {OptionValue, FormDescription, FormTitle, QuestionType} from '../interface/Form';

interface DefaultValues {
  TITLE: FormTitle;
  QUESTION_TITLE: FormDescription;
  QUESTION_TYPE: QuestionType;
  QUESTION_OPTION: OptionValue;
}

export const LABELS = {
  DROP_DOWN: 'Choose',
  OTHER_OPTION: 'Other: ',
};

export const PLACEHOLDERS = {
  DESCRIPTION: 'Form description',
  QUESTION: 'Question',
};

export const QUESTION_TYPES = {
  shortAnswer: 'shortAnswer',
  paragraph: 'paragraph',
  multipleChoice: 'multipleChoice',
  checkboxes: 'checkboxes',
  dropDown: 'dropDown',
};

export const DEFAULT_VALUES: DefaultValues = {
  TITLE: 'Untitled form',
  QUESTION_TITLE: 'Untitled Question',
  QUESTION_TYPE: QUESTION_TYPES.multipleChoice as QuestionType,
  QUESTION_OPTION: 'Option',
};
