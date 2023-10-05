type FormTitle = string;

type FormDescription = string;

type QuestionTitle = string;

export enum QuestionType {
    shortAnswer = 'ShortAnswer',
    paragraph = 'Paragraph',
    multipleChoice = 'MultipleChoice',
    checkboxes = 'Checkboxes',
    dropDown = 'DropDown',
}

type Answer = string;

export interface Question {
    title: QuestionTitle;
    type: QuestionType;
    options: Answer[];
    isRequired: boolean;
}

export interface Form {
    title: FormTitle;
    description: FormDescription;
    questions: Question[];
}
