import {QUESTION_TYPES, OTHER_IDX} from '../constants/Form';

export type FormTitle = string;

export type FormDescription = string;

export type QuestionTitle = string;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export type OptionType = string;

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

// Option
export interface Option {
  id: string;
  value: string;
  isSelected: boolean;
}

// Question
interface DefaultQuestion {
  id: string;
  type: QuestionType;
  title: QuestionTitle;
  isRequired: boolean;
  isFocused: boolean;
}

export interface MultipleChoice extends DefaultQuestion {
  options: Option[];
  isOtherSelected: boolean;
  other: string;
}

interface Checkboxes extends DefaultQuestion {
  options: Option[];
  isOtherSelected: boolean;
  other: string;
}

interface DropDown extends DefaultQuestion {
  options: Option[];
}

interface ShortAnswer extends DefaultQuestion {
  answer: string;
}

interface Paragraph extends DefaultQuestion {
  answer: string;
}

export type Question = MultipleChoice | Checkboxes | DropDown | ShortAnswer | Paragraph;

// Form
export interface SurveyForm {
  title: FormTitle;
  description: FormDescription;
  questions: Question[];
}
