import SPBottomButtons from '../components/SurveyPreview/SPBottomButtons';
import SPQuestionList from '../components/SurveyPreview/SPQuestionList';
import StaticBasicInfo from '../components/common/StaticBasicInfo';
import {StyledSurveyContainer} from '../styles/Form';

const PreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <StaticBasicInfo />
      <SPQuestionList />
      <SPBottomButtons />
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
