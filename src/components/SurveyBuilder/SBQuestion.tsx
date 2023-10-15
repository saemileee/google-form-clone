import React from 'react';
import styled from 'styled-components';
import {QUESTION_TYPES} from '../../constants/Form';
import {Question} from '../../interface/Form';
import {StyledQuestionWrapper} from '../../styles/Form';
import SBQuestionBasicInfo from './SBQuestionBasicInfo';
import SBQuestionOptionList from './SBQuestionOptionList';
import SBQuestionPanel from './SBQuestionPanel';
import SBQuestionTextTypeForm from './SBQuestionTextTypeForm';

const SBQuestion = ({questionForm}: {questionForm: Question}) => {
  const {id, isFocused, isRequired, type} = questionForm;

  const isOptionalType =
    type === QUESTION_TYPES.multipleChoice ||
    type === QUESTION_TYPES.checkboxes ||
    type === QUESTION_TYPES.dropDown;

  return (
    <StyledQuestionContainer $padding={0}>
      <SBQuestionBasicInfo questionForm={questionForm} />
      {isOptionalType && <SBQuestionOptionList questionForm={questionForm} />}
      {(type === QUESTION_TYPES.shortAnswer || type === QUESTION_TYPES.paragraph) && (
        <SBQuestionTextTypeForm type={type} />
      )}
      {isFocused && <SBQuestionPanel questionId={id} isRequired={isRequired} />}
    </StyledQuestionContainer>
  );
};

export default React.memo(SBQuestion);

export const StyledQuestionContainer = styled(StyledQuestionWrapper)`
  padding-bottom: 32px;
`;
