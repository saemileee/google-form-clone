import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewQuestionList from '../components/SurveyPreviewForm/QuestionList';
import SurveyPreviewTitle from '../components/SurveyPreviewForm/Title';
import {
  StyledGeneralFormContainer,
  StyledGeneralFormWrapper,
  StyledSurveyContainer,
} from '../styles/Form';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const PreviewContainer = () => {
  const formData = useSelector((state: RootState) => state.surveyPreviewForm);
  const {title, description, questions} = formData;
  return (
    <StyledSurveyContainer>
      <StyledGeneralFormContainer>
        <StyledGeneralFormWrapper>
          <SurveyPreviewTitle title={title} />
          <SurveyPreviewDescription description={description} />
        </StyledGeneralFormWrapper>
        <SurveyPreviewQuestionList questions={questions} />
      </StyledGeneralFormContainer>
    </StyledSurveyContainer>
  );
};

export default PreviewContainer;
