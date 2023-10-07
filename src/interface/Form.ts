import {QUESTION_TYPES} from '../constants/Form';

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
  selectedOptionIndex: number | null;
  other: string | null;
}

export interface AnswerCheckboxes {
  selectedOptionIndexes: number[] | null;
  other: string | null;
}
export interface AnswerDropDown {
  selectedOptionIndex: number | null;
}
export interface AnswerShortAnswer {
  answer: string | null;
}
export interface AnswerParagraph {
  answer: string | null;
}

export type PreviewQuestionAnswer =
  | AnswerMultipleChoice
  | AnswerCheckboxes
  | AnswerDropDown
  | AnswerShortAnswer
  | AnswerParagraph;

export interface PreviewQuestion {
  title: QuestionTitle;
  layout: {
    isSelected: boolean;
    type: QuestionType;
    options: OptionType[];
    isOtherSelected: boolean;
    isRequired: boolean;
  };
  answer: PreviewQuestionAnswer;
}

export interface PreviewQuestionForm {
  title: FormTitle;
  description: FormDescription;
  questions: PreviewQuestion[];
}
