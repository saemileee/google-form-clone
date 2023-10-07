import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const SurveyPreviewTitle = () => {
  const title = useSelector((state: RootState) => state.surveyPreviewForm).title;
  return <h1>{title}</h1>;
};

export default SurveyPreviewTitle;
