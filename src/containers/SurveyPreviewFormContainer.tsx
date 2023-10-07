import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewQuestionList from '../components/SurveyPreviewForm/QuestionList';
import SurveyPreviewTitle from '../components/SurveyPreviewForm/Title';
import {
  StyledFormInfoLine,
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
  StyledSurveyContainer,
} from '../styles/Form';

const PreviewContainer = () => {
  return (
    <StyledSurveyContainer>
      <StyledGeneralFormContainer>
        <StyledFormInfoLine />
        <StyledGeneralFormWrapper>
          <SurveyPreviewTitle />
          <SurveyPreviewDescription />
        </StyledGeneralFormWrapper>
      </StyledGeneralFormContainer>
      <SurveyPreviewQuestionList />
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
