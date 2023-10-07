import styled from 'styled-components';
import ClearFormButton from '../components/SurveyPreviewForm/ClearFormButton';
import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewQuestionList from '../components/SurveyPreviewForm/QuestionList';
import SubmitButton from '../components/SurveyPreviewForm/SubmitButton';
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
      <StyledBottomButtonWrapper>
        <SubmitButton />
        <ClearFormButton />
      </StyledBottomButtonWrapper>
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;

const StyledBottomButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
