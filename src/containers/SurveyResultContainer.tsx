import {useEffect} from 'react';
import ResultBasicInfo from '../components/SurveyResult/ResultBasicInfo';
import ResultQuestionList from '../components/SurveyResult/ResultQuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyResultContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <StyledSurveyContainer>
      <ResultBasicInfo />
      <ResultQuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyResultContainer;
