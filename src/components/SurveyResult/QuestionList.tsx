import {StyledFormWrapper} from '../../styles/Form';
import QuestionForm from './QuestionForm';
import {formResultStateStorage} from '../../store/localStorage';
import {PreviewQuestion} from '../../interface/Form';

const SurveyPreviewQuestionList = () => {
  const questions: PreviewQuestion[] = formResultStateStorage.getItem().questions;
  return (
    <StyledFormWrapper>
      {questions.map((_, questionIdx) => (
        <QuestionForm key={`question-${questionIdx}`} questionIdx={questionIdx} />
      ))}
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
