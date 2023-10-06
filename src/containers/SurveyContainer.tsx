import styled from 'styled-components';
import Description from '../components/FormFields/Description';
import QuestionList from '../components/FormFields/QuestionList';
import Title from '../components/FormFields/Title';
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
`;
