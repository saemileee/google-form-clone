import SurveyBuilderBasicInfo from '../components/SurveyBuilder/SBBasicInfo';
import SurveyBuilderQuestionList from '../components/SurveyBuilder/SBQuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyBuilderContainer = () => {
  return (
    <StyledSurveyContainer>
      <SurveyBuilderBasicInfo />
      <SurveyBuilderQuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyBuilderContainer;
