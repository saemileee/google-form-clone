import PostBasicInfo from '../components/SurveyPostForm/PostBasicInfo';
import PostQuestionList from '../components/SurveyPostForm/PostQuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyPostFormContainer = () => {
  return (
    <StyledSurveyContainer>
      <PostBasicInfo />
      <PostQuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyPostFormContainer;
