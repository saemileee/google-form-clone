import {StyledFormWrapper} from '../../styles/Form';
import SRQuestion from './SRQuestion';
import {formResultStateStorage} from '../../store/localStorage';
import {Question} from '../../interface/Form';

const SRQuestionList = () => {
  const cachedResultForm = formResultStateStorage.getItem();

  const questions: Question[] = cachedResultForm.questions;
  return (
    <StyledFormWrapper>
      {questions.map(question => (
        <SRQuestion key={question.id} questionForm={question} />
      ))}
    </StyledFormWrapper>
  );
};

export default SRQuestionList;
