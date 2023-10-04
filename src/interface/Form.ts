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

type Answer = string | null;

export interface Question {
    id: number;
    title: QuestionTitle;
    type: keyof typeof QuestionType;
    options: Answer[];
    isRequired: boolean;
}

export interface Form {
    title: FormTitle;
    description: FormDescription;
    questions: Question[];
}
