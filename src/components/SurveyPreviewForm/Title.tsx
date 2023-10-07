import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {StyledTitle} from '../../styles/Form';

const SurveyPreviewTitle = () => {
  const title = useSelector((state: RootState) => state.surveyPreviewForm).title;
  return <StyledTitle>{title}</StyledTitle>;
};

export default SurveyPreviewTitle;
