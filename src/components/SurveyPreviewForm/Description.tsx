import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {StyledDescription} from '../../styles/Form';

const SurveyPreviewDescription = () => {
  const description = useSelector((state: RootState) => state.surveyPreviewForm).description;
  return <StyledDescription>{description}</StyledDescription>;
};

export default SurveyPreviewDescription;
