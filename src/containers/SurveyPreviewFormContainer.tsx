import SurveyPreviewQuestionList from '../components/SurveyPreviewForm/QuestionList';
import {StyledSurveyContainer} from '../styles/Form';
import BasicInfo from '../components/SurveyPostForm/BasicInfo';
import BottomButtons from '../components/SurveyPreviewForm/BottomButtons';

const PreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <BasicInfo />
      <SurveyPreviewQuestionList />
      <BottomButtons />
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
