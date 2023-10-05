import {QUESTION_TYPES} from '../constants/Form';

export type FormTitle = string;

export type FormDescription = string;

export type QuestionTitle = string;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export type Option = string;

export interface Question {
    title: QuestionTitle;
    type: keyof QuestionType;
    options: Option[];
    isRequired: boolean;
}

export interface Form {
    title: FormTitle;
    description: FormDescription;
    questions: Question[];
}
