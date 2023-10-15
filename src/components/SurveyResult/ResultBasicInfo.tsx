import {
  StyledGeneralFormContainer,
  StyledFormInfoLine,
  StyledGeneralFormWrapper,
} from '../../styles/Form';
import Description from '../common/StaticBasicInfo/Description';
import Title from '../common/StaticBasicInfo/Title';

const BasicInfo = () => {
  return (
    <StyledGeneralFormContainer>
      <StyledFormInfoLine />
      <StyledGeneralFormWrapper>
        <p>✅ 응답에 참여해 주셔서 감사합니다.</p>
        <Title />
        <Description />
      </StyledGeneralFormWrapper>
    </StyledGeneralFormContainer>
  );
};

export default BasicInfo;
