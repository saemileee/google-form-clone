import QuestionBottomMenu from './QuestionBottomMenu';
import React from 'react';
import QuestionFormTop from './QuestionFormTop';
import {StyledQuestionWrapper} from '../../../styles/Form';
import OptionList from '../PostQuestionOptionList';
import styled from 'styled-components';
import {Question} from '../../../interface/Form';
import {QUESTION_TYPES} from '../../../constants/Form';
import TextTypeForm from '../PostGlobal/TextTypeForm';

const QuestionForm = ({questionForm}: {questionForm: Question}) => {
  const {id, isFocused, isRequired, type} = questionForm;

  const isOptionalType =
    type === QUESTION_TYPES.multipleChoice ||
    type === QUESTION_TYPES.checkboxes ||
    type === QUESTION_TYPES.dropDown;

  return (
    <StyledQuestionContainer $padding={0}>
      <QuestionFormTop questionForm={questionForm} />
      {isOptionalType && <OptionList questionForm={questionForm} />}
      {(type === QUESTION_TYPES.shortAnswer || type === QUESTION_TYPES.paragraph) && (
        <TextTypeForm type={type} />
      )}
      {isFocused && <QuestionBottomMenu questionId={id} isRequired={isRequired} />}
    </StyledQuestionContainer>
  );
};

export default React.memo(QuestionForm);

export const StyledQuestionContainer = styled(StyledQuestionWrapper)`
  padding-bottom: 32px;
`;
