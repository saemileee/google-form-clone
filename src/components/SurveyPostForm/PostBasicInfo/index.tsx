import {
  StyledGeneralFormContainer,
  StyledFormInfoLine,
  StyledGeneralFormWrapper,
} from '../../../styles/Form';
import Description from './Description';
import Title from './Title';

const BasicInfo = () => {
  return (
    <StyledGeneralFormContainer>
      <StyledFormInfoLine />
      <StyledGeneralFormWrapper>
        <Title />
        <Description />
      </StyledGeneralFormWrapper>
    </StyledGeneralFormContainer>
  );
};

export default BasicInfo;
