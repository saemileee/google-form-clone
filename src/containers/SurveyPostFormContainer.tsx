import BasicInfo from '../components/SurveyPostForm/BasicInfo';
import QuestionList from '../components/SurveyPostForm/QuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyPostFormContainer = () => {
  return (
    <StyledSurveyContainer>
      <BasicInfo />
      <QuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyPostFormContainer;
