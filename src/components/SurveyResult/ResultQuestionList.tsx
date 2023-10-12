import {StyledFormWrapper} from '../../styles/Form';
import ResultQuestionForm from './ResultQuestionForm';
import {formResultStateStorage} from '../../store/localStorage';
import {PreviewQuestion} from '../../interface/Form';

const SurveyPreviewQuestionList = () => {
  const questions: PreviewQuestion[] = formResultStateStorage.getItem().questions;
  return (
    <StyledFormWrapper>
      {questions.map((_, questionIdx) => (
        <ResultQuestionForm key={`question-${questionIdx}`} questionIdx={questionIdx} />
      ))}
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
