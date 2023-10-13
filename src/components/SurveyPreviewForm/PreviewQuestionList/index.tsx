import {useSelector} from 'react-redux';
import QuestionForm from './QuestionForm';
import {RootState} from '../../../store/store';
import {StyledFormWrapper} from '../../../styles/Form';

const SurveyPreviewQuestionList = () => {
  const questions = useSelector((state: RootState) => state.surveyPreviewForm.questions);
  return (
    <StyledFormWrapper>
      {questions.map(question => (
        <QuestionForm key={question.id} questionForm={question} />
      ))}
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
