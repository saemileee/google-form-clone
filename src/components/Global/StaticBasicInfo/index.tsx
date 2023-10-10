import styled from 'styled-components';
import {
  StyledGeneralFormContainer,
  StyledFormInfoLine,
  StyledGeneralFormWrapper,
} from '../../../styles/Form';
import SurveyPreviewDescription from './Description';
import SurveyPreviewTitle from './Title';
import {color} from '../../../styles/variables.ts/color';

const BasicInfo = () => {
  return (
    <StyledGeneralFormContainer>
      <StyledFormInfoLine />
      <StyledGeneralFormWrapper>
        <SurveyPreviewTitle />
        <SurveyPreviewDescription />

        <StyledMsg>* Indicates required question</StyledMsg>
      </StyledGeneralFormWrapper>
    </StyledGeneralFormContainer>
  );
};

export default BasicInfo;

const StyledMsg = styled.p`
  border-top: 1px solid ${color.border};
  padding-top: 20px;
  padding-bottom: 7px;
  color: red;
`;
