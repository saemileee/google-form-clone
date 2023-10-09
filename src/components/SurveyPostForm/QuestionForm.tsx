import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';
import {StyledQuestionWrapper} from '../../styles/Form';

import QuestionBottomMenu from './QuestionBottomMenu';
import React from 'react';
import QuestionFormTop from './QuestionFormTop';
import OptionList from './OptionList';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const isSelected = useSelector(
    (state: RootState) => state.questionForm.questions[questionIdx].isSelected
  );

  return (
    <StyledQuestionWrapper>
      <QuestionFormTop questionIdx={questionIdx} />
      <OptionList questionIdx={questionIdx} />
      {isSelected && <QuestionBottomMenu questionIdx={questionIdx} />}
    </StyledQuestionWrapper>
  );
};

export default React.memo(QuestionForm);
