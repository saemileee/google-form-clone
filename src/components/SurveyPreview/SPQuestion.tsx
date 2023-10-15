import {useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import {RiErrorWarningLine} from 'react-icons/ri';
import styled from 'styled-components';
import {Question} from '../../interface/Form';
import {RootState} from '../../store/store';
import {StyledQuestionTitle, StyledGeneralFormContainer} from '../../styles/Form';
import {color} from '../../styles/variables.ts/color';
import SPQuestionForm from './SPQuestionForm';

const SPQuestion = ({questionForm}: {questionForm: Question}) => {
  const {invalidQuestions, submitTryCount} = useSelector((state: RootState) => state.surveyPreview);
  const {id, title, isRequired} = questionForm;

  const isInvalid = invalidQuestions.includes(id);
  const questionFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (invalidQuestions[0] === id) {
      if (questionFormRef.current)
        questionFormRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, [submitTryCount]);

  return (
    <StyledQuestionFormContainer ref={questionFormRef} $padding={24} $gap={32} $invalid={isInvalid}>
      <StyledQuestionTitle>
        {title}
        {isRequired && <span className='symbol-required'> *</span>}
      </StyledQuestionTitle>

      <SPQuestionForm questionForm={questionForm} />

      {isInvalid && (
        <StyledInvalidatedMsg>
          <RiErrorWarningLine size={24} />
          This is a required question
        </StyledInvalidatedMsg>
      )}
    </StyledQuestionFormContainer>
  );
};

export default SPQuestion;

const StyledQuestionFormContainer = styled(StyledGeneralFormContainer)<{$invalid: boolean}>`
  padding-top: 40px;
  border-color: ${props => (props.$invalid ? 'red' : color.border)};
`;

const StyledInvalidatedMsg = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: red;
  font-size: 10pt;
  svg {
    padding-bottom: 3px;
  }
`;
