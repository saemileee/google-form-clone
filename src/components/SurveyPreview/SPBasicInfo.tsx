import styled from 'styled-components';
import {
  StyledFormInfoLine,
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
} from '../../styles/Form';
import {color} from '../../styles/variables.ts/color';
import SurveyPreviewDescription from '../common/StaticBasicInfo/Description';
import SurveyPreviewTitle from '../common/StaticBasicInfo/Title';

const SPBasicInfo = () => {
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

export default SPBasicInfo;

const StyledMsg = styled.p`
  border-top: 1px solid ${color.border};
  padding-top: 20px;
  padding-bottom: 7px;
  color: red;
`;
