import {useSelector} from 'react-redux';
import {StyledFormWrapper, StyledGeneralFormContainer} from '../../styles/Form';
import QuestionForm from './QuestionForm';
import {RootState} from '../../store/store';

const SurveyPreviewQuestionList = () => {
  const questions = useSelector((state: RootState) => state.surveyPreviewForm.questions);
  return (
    <StyledFormWrapper>
      <StyledGeneralFormContainer>
        {questions.map((_, questionIdx) => (
          <QuestionForm questionIdx={questionIdx} />
        ))}
      </StyledGeneralFormContainer>
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
