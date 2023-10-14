import {StyledFormWrapper} from '../../styles/Form';
import ResultQuestionForm from './ResultQuestionForm';
import {formResultStateStorage} from '../../store/localStorage';
import {Question} from '../../interface/Form';

const SurveyPreviewQuestionList = () => {
  const questions: Question[] = formResultStateStorage.getItem().questions;
  return (
    <StyledFormWrapper>
      {questions.map(question => (
        <ResultQuestionForm key={question.id} questionForm={question} />
      ))}
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
