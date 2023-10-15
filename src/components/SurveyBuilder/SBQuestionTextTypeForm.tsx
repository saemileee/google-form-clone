import styled from 'styled-components';
import {QUESTION_TYPES} from '../../constants/Form';
import {QuestionType} from '../../interface/Form';
import {color} from '../../styles/variables.ts/color';

const SBQuestionTextTypeForm = ({type}: {type: QuestionType}) => {
  const getTextTypeForm = () => {
    switch (type) {
      case QUESTION_TYPES.shortAnswer:
        return <StyledShortAnswerTypeForm>Short answer text</StyledShortAnswerTypeForm>;
      case QUESTION_TYPES.paragraph:
        return <StyledLongAnswerTypeForm>Long answer text</StyledLongAnswerTypeForm>;
      default:
        <></>;
    }
    return <></>;
  };
  return getTextTypeForm();
};

export default SBQuestionTextTypeForm;

const StyledShortAnswerTypeForm = styled.div`
  margin: 0 24px 32px 24px;
  padding: 12px 0 6px 0;
  width: 50%;
  border-bottom: 1px dotted ${color.lightgrey};
  color: grey;
  font-weight: 500;
`;

const StyledLongAnswerTypeForm = styled.div`
  margin: 0 24px 32px 24px;
  padding: 12px 0 6px 0;
  border-bottom: 1px dotted ${color.lightgrey};
  color: grey;
  font-weight: 500;
`;
