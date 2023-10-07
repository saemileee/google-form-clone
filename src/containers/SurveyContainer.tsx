import styled from 'styled-components';
import Description from '../components/SurveyPostForm/Description';
import QuestionList from '../components/SurveyPostForm/QuestionList';
import Title from '../components/SurveyPostForm/Title';
import {StyledGeneralFormContainer, StyledGeneralFormWrapper} from '../styles/Form';

const surveyContainer = () => {
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

export default surveyContainer;

const StyledSurveyContainer = styled.div`
  margin: 0 auto;
  width: 768px;
  padding-top: 12px;
`;

const StyledFormInfoLine = styled.div`
  width: 100%;
  height: 16px;
  background-color: blue;
  border-radius: 8px 8px 0 0;
`;
