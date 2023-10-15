import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {StyledFormWrapper} from '../../styles/Form';
import SPQuestion from './SPQuestion';

const SPQuestionList = () => {
  const questions = useSelector((state: RootState) => state.surveyPreview.questions);
  return (
    <StyledFormWrapper>
      {questions.map(question => (
        <SPQuestion key={question.id} questionForm={question} />
      ))}
    </StyledFormWrapper>
  );
};

export default SPQuestionList;
