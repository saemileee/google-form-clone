import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewTitle from '../components/SurveyPreviewForm/Title';
import {formStateStorage} from '../store/localStorage';
import {
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
  StyledSurveyContainer,
} from '../styles/Form';

const PreviewContainer = () => {
  const formData = formStateStorage.getItem();
  const {title, description} = formData;
  return (
    <StyledSurveyContainer>
      <StyledGeneralFormContainer>
        <StyledGeneralFormWrapper>
          <SurveyPreviewTitle title={title} />
          <SurveyPreviewDescription description={description} />
        </StyledGeneralFormWrapper>
      </StyledGeneralFormContainer>
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
