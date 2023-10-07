import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewQuestionList from '../components/SurveyPreviewForm/QuestionList';
import SurveyPreviewTitle from '../components/SurveyPreviewForm/Title';
import {
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
  StyledSurveyContainer,
} from '../styles/Form';

const PreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <StyledGeneralFormContainer>
        <StyledGeneralFormWrapper>
          <SurveyPreviewTitle />
          <SurveyPreviewDescription />
        </StyledGeneralFormWrapper>
        <SurveyPreviewQuestionList />
      </StyledGeneralFormContainer>
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
