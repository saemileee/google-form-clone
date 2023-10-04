type FormTitle = string;

type FormDescription = string;

type QuestionTitle = string;

type QuestionType = 'ShortAnswer' | 'Paragraph' | 'MultipleChoice' | 'Checkboxes' | 'DropDown';

type Answer = string | null;

export interface Question {
    id: number;
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
