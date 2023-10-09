import {
  StyledGeneralFormContainer,
  StyledFormInfoLine,
  StyledGeneralFormWrapper,
} from '../../../styles/Form';
import SurveyPreviewDescription from './Description';
import SurveyPreviewTitle from './Title';

const BasicInfo = () => {
  return (
    <StyledGeneralFormContainer>
      <StyledFormInfoLine />
      <StyledGeneralFormWrapper>
        <SurveyPreviewTitle />
        <SurveyPreviewDescription />
      </StyledGeneralFormWrapper>
    </StyledGeneralFormContainer>
  );
};

export default BasicInfo;
