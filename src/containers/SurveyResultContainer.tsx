import {useEffect} from 'react';
import {StyledSurveyContainer} from '../styles/Form';
import SRBasicInfo from '../components/SurveyResult/SRBasicInfo';
import SRQuestionList from '../components/SurveyResult/SRQuestionList';

const SurveyResultContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <StyledSurveyContainer>
      <SRBasicInfo />
      <SRQuestionList />
    </StyledSurveyContainer>
  );
};

export default SurveyResultContainer;
