import Description from '../components/Global/StaticBasicInfo/Description';
import Title from '../components/Global/StaticBasicInfo/Title';
import SurveyPreviewQuestionList from '../components/SurveyResult/QuestionList';
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
          <Title />
          <Description />
        </StyledGeneralFormWrapper>
      </StyledGeneralFormContainer>
      <SurveyPreviewQuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyResultContainer;
