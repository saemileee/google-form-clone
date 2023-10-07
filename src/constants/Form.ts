import {OptionType, FormDescription, FormTitle, QuestionType} from '../interface/Form';

interface DefaultValues {
  TITLE: FormTitle;
  QUESTION_TITLE: FormDescription;
  QUESTION_TYPE: QuestionType;
  QUESTION_OPTION: OptionType;
  DROP_DOWN: string;
}

export const DEFAULT_VALUES: DefaultValues = {
  TITLE: 'Untitled form',
  QUESTION_TITLE: 'Untitled Question',
  QUESTION_TYPE: 'MultipleChoice',
  QUESTION_OPTION: 'Option',
  DROP_DOWN: 'Choose',
};

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
