import SurveyPreviewQuestionList from '../components/SurveyPreviewForm/QuestionList';
import {StyledSurveyContainer} from '../styles/Form';
import StaticBasicInfo from '../components/Global/StaticBasicInfo';
import BottomButtons from '../components/SurveyPreviewForm/BottomButtons';

const PreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <StaticBasicInfo />
      <SurveyPreviewQuestionList />
      <BottomButtons />
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
