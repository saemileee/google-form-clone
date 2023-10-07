import Description from '../components/SurveyPostForm/Description';
import QuestionList from '../components/SurveyPostForm/QuestionList';
import Title from '../components/SurveyPostForm/Title';
import {
  StyledFormInfoLine,
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
  StyledSurveyContainer,
} from '../styles/Form';

const SurveyPostFormContainer = () => {
  return (
    <StyledSurveyContainer>
      <StyledGeneralFormContainer>
        <StyledFormInfoLine />
        <StyledGeneralFormWrapper>
          <Title />
          <Description />
        </StyledGeneralFormWrapper>
      </StyledGeneralFormContainer>
      <QuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyPostFormContainer;
