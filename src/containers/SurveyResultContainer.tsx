import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewQuestionList from '../components/SurveyResult/QuestionList';
import SurveyPreviewTitle from '../components/SurveyPreviewForm/Title';
import {
  StyledFormInfoLine,
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
  StyledSurveyContainer,
} from '../styles/Form';

const SurveyResultContainer = () => {
  return (
    <StyledSurveyContainer>
      <StyledGeneralFormContainer>
        <StyledFormInfoLine />
        <StyledGeneralFormWrapper>
          <p>응답에 참여해 주셔서 감사합니다.</p>
          <SurveyPreviewTitle />
          <SurveyPreviewDescription />
        </StyledGeneralFormWrapper>
      </StyledGeneralFormContainer>
      <SurveyPreviewQuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyResultContainer;
