import {StyledGeneralFormContainer, StyledQuestionTitle} from '../../styles/Form';
import {Question} from '../../interface/Form';
import QuestionForm from '../common/Question/QuestionForm';

const SRQuestion = ({questionForm}: {questionForm: Question}) => {
  const {title, isRequired} = questionForm;

  return (
    <StyledGeneralFormContainer $padding={24} $gap={24}>
      <StyledQuestionTitle>
        {title}
        {isRequired && <span className='symbol-required'> *</span>}
      </StyledQuestionTitle>
      <QuestionForm isForResult questionForm={questionForm} />
    </StyledGeneralFormContainer>
  );
};

export default SRQuestion;
