import QuestionBottomMenu from './QuestionBottomMenu';
import React from 'react';
import QuestionFormTop from './QuestionFormTop';
import {StyledQuestionWrapper} from '../../../styles/Form';
import OptionList from '../PostQuestionOptionList';
import styled from 'styled-components';
import {Question} from '../../../interface/Form';

const QuestionForm = ({questionForm}: {questionForm: Question}) => {
  const {id, isFocused, isRequired} = questionForm;
  return (
    <StyledQuestionContainer $padding={0}>
      <QuestionFormTop questionForm={questionForm} />
      <OptionList questionForm={questionForm} />
      {isFocused && <QuestionBottomMenu questionId={id} isRequired={isRequired} />}
    </StyledQuestionContainer>
  );
};

export default React.memo(QuestionForm);

export const StyledQuestionContainer = styled(StyledQuestionWrapper)`
  padding-bottom: 32px;
`;
