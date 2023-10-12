import {useSelector} from 'react-redux';
import QuestionForm from './QuestionForm';
import {RootState} from '../../../store/store';
import {StyledFormWrapper} from '../../../styles/Form';

const SurveyPreviewQuestionList = () => {
  const questions = useSelector((state: RootState) => state.surveyPreviewForm.questions);
  return (
    <StyledFormWrapper>
      {questions.map((_, questionIdx) => (
        <QuestionForm key={`question-${questionIdx}`} questionIdx={questionIdx} />
      ))}
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
