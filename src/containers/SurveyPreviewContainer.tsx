import SPBasicInfo from '../components/SurveyPreview/SPBasicInfo';
import SPBottomButtons from '../components/SurveyPreview/SPBottomButtons';
import SPQuestionList from '../components/SurveyPreview/SPQuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyPreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <SPBasicInfo />
      <SPQuestionList />
      <SPBottomButtons />
    </StyledSurveyContainer>
  );
};

export default SurveyPreviewContainer;
