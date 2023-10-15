import {StyledGeneralFormContainer} from '../../styles/Form';
import {Question} from '../../interface/Form';
import QuestionForm from '../common/Question/QuestionForm';
import QuestionTitle from '../common/Question/QuestionTitle';

const SRQuestion = ({questionForm}: {questionForm: Question}) => {
  const {title, isRequired} = questionForm;

  return (
    <StyledGeneralFormContainer $padding={24} $gap={24}>
      <QuestionTitle title={title} isRequired={isRequired} />
      <QuestionForm isForResult questionForm={questionForm} />
    </StyledGeneralFormContainer>
  );
};

export default SRQuestion;
