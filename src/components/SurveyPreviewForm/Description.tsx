import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const SurveyPreviewDescription = () => {
  const description = useSelector((state: RootState) => state.surveyPreviewForm).description;
  return <p>{description}</p>;
};

export default SurveyPreviewDescription;
