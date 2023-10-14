import {OptionType, FormDescription, FormTitle, QuestionType} from '../interface/Form';

interface DefaultValues {
  TITLE: FormTitle;
  QUESTION_TITLE: FormDescription;
  QUESTION_TYPE: QuestionType;
  QUESTION_OPTION: OptionType;
}

export const LABELS = {
  DROP_DOWN: 'Choose',
  OTHER_OPTION: 'Other: ',
};

export const OTHER_IDX = 'other' as const;

export const PLACEHOLDERS = {
  DESCRIPTION: 'Form description',
  QUESTION: 'Question',
};

export const QUESTION_TYPES = {
  shortAnswer: 'ShortAnswer',
  paragraph: 'Paragraph',
  multipleChoice: 'MultipleChoice',
  checkboxes: 'Checkboxes',
  dropDown: 'DropDown',
};

export const DEFAULT_VALUES: DefaultValues = {
  TITLE: 'Untitled form',
  QUESTION_TITLE: 'Untitled Question',
  QUESTION_TYPE: QUESTION_TYPES.multipleChoice as QuestionType,
  QUESTION_OPTION: 'Option',
};

export const ID_PREFIX = {
  QUESTION: 'Q',
  OPTION: 'O',
};
