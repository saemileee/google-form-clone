import {useEffect} from 'react';
import BasicInfo from '../components/SurveyResult/BasicInfo';
import QuestionList from '../components/SurveyResult/QuestionList';
import {StyledSurveyContainer} from '../styles/Form';

const SurveyResultContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <StyledSurveyContainer>
      <BasicInfo />
      <QuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyResultContainer;
