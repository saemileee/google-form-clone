import PreviewQuestionList from '../components/SurveyPreviewForm/PreviewQuestionList';
import {StyledSurveyContainer} from '../styles/Form';
import StaticBasicInfo from '../components/Global/StaticBasicInfo';
import PreviewBottomButtons from '../components/SurveyPreviewForm/PreviewBottomButtons';

const PreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <StaticBasicInfo />
      <PreviewQuestionList />
      <PreviewBottomButtons />
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
