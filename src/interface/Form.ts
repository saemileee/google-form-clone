import {QUESTION_TYPES, OTHER_IDX} from '../constants/Form';

export type FormTitle = string;

export type FormDescription = string;

export type QuestionTitle = string;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export type OptionType = string;

export interface Question {
  isSelected: boolean;
  title: QuestionTitle;
  type: QuestionType;
  options: OptionType[];
  isOtherSelected: boolean;
  isRequired: boolean;
}

export interface Form {
  title: FormTitle;
  description: FormDescription;
  questions: Question[];
}

export interface AnswerMultipleChoice {
  selectedOptionIndex: number | typeof OTHER_IDX | null;
  other: string | null;
}

export interface AnswerCheckboxes {
  selectedOptionIndexes: (number | 'other')[];
  other: string | null;
}
export interface AnswerDropDown {
  selectedOptionIndex: number | null;
}
export interface AnswerTextAnswer {
  answer: string;
}

export interface PreviewQuestion {
  title: QuestionTitle;
  layout: {
    isSelected: boolean;
    type: QuestionType;
    options: OptionType[];
    isOtherSelected: boolean;
    isRequired: boolean;
  };
  answer: {
    multipleChoice?: AnswerMultipleChoice;
    checkboxes?: AnswerCheckboxes;
    dropDown?: AnswerDropDown;
    shortAnswer?: AnswerTextAnswer;
    paragraph?: AnswerTextAnswer;
  };
}

export interface PreviewQuestionForm {
  title: FormTitle;
  description: FormDescription;
  questions: PreviewQuestion[];
  invalidQuestions: number[];
  submitTryCount: number;
}
