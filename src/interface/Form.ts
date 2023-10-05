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
    isRequired: boolean;
}

export interface Form {
    title: FormTitle;
    description: FormDescription;
    questions: Question[];
}
