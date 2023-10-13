import {QUESTION_TYPES} from '../constants/Form';

export type FormTitle = string;

export type FormDescription = string;

export type QuestionTitle = string;

export type QuestionType = keyof typeof QUESTION_TYPES;

export type OptionType = string;

// NOTE: Option
export interface Option {
  id: string;
  value: string;
  isSelected: boolean;
}

export interface Other {
  isFormActive: boolean;
  isSelected: boolean;
  value: string;
}

// NOTE: Question
interface DefaultQuestion {
  id: string;
  type: QuestionType;
  title: QuestionTitle;
  isRequired: boolean;
  isFocused: boolean;
}

export interface MultipleChoice extends DefaultQuestion {
  options: Option[];
  other: Other;
}

export interface Checkboxes extends DefaultQuestion {
  options: Option[];
  other: Other;
}

export interface DropDown extends DefaultQuestion {
  options: Option[];
}

export interface ShortAnswer extends DefaultQuestion {
  answer: string;
}

export interface Paragraph extends DefaultQuestion {
  answer: string;
}

export type Question = MultipleChoice | Checkboxes | DropDown | ShortAnswer | Paragraph;

export type OptionalQuestion = MultipleChoice | Checkboxes | DropDown;

export type OtherTypeQuestion = MultipleChoice | Checkboxes;

export type TextTypeQuestion = ShortAnswer | Paragraph;

// NOTE: Form
export interface SurveyForm {
  title: FormTitle;
  description: FormDescription;
  questions: Question[];
  timer: NodeJS.Timer | null;
  saveTime: string | null;
}

export interface SurveyPreviewForm extends SurveyForm {
  invalidQuestions: string[];
  submitTryCount: number;
}
