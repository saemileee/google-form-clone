import {
  StyledGeneralFormContainer,
  StyledFormInfoLine,
  StyledGeneralFormWrapper,
} from '../../styles/Form';
import Description from '../Global/StaticBasicInfo/Description';
import Title from '../Global/StaticBasicInfo/Title';

const BasicInfo = () => {
  return (
    <StyledGeneralFormContainer>
      <StyledFormInfoLine />
      <StyledGeneralFormWrapper>
        <p>응답에 참여해 주셔서 감사합니다.</p>
        <Title />
        <Description />
      </StyledGeneralFormWrapper>
    </StyledGeneralFormContainer>
  );
};

export default BasicInfo;
