import {
  StyledGeneralFormContainer,
  StyledFormInfoLine,
  StyledGeneralFormWrapper,
} from '../../styles/Form';
import SBBasicInfoDescription from './SBBasicInfoDescription';
import SBBasicInfoTitle from './SBBasicInfoTitle';

const SBBasicInfo = () => {
  return (
    <StyledGeneralFormContainer>
      <StyledFormInfoLine />
      <StyledGeneralFormWrapper>
        <SBBasicInfoTitle />
        <SBBasicInfoDescription />
      </StyledGeneralFormWrapper>
    </StyledGeneralFormContainer>
  );
};

export default SBBasicInfo;
