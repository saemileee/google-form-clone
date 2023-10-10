import {useSelector} from 'react-redux';
import QuestionBottomMenu from './QuestionBottomMenu';
import React from 'react';
import QuestionFormTop from './QuestionFormTop';
import {RootState} from '../../../../store/store';
import {StyledQuestionWrapper} from '../../../../styles/Form';
import OptionList from './OptionList';
import styled from 'styled-components';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const isSelected = useSelector(
    (state: RootState) => state.questionForm.questions[questionIdx].isSelected
  );

  return (
    <StyledQuestionContainer $padding={0}>
      <QuestionFormTop questionIdx={questionIdx} />
      <OptionList questionIdx={questionIdx} />
      {isSelected && <QuestionBottomMenu questionIdx={questionIdx} />}
    </StyledQuestionContainer>
  );
};

export default React.memo(QuestionForm);

export const StyledQuestionContainer = styled(StyledQuestionWrapper)`
  padding-bottom: 32px;
`;
