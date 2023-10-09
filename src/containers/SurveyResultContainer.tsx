import BasicInfo from '../components/SurveyResult/BasicInfo';
import QuestionList from '../components/SurveyResult/QuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyResultContainer = () => {
  return (
    <StyledSurveyContainer>
      <BasicInfo />
      <QuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyResultContainer;
