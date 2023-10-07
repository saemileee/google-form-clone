import SurveyPreviewDescription from '../components/SurveyPreviewForm/Description';
import SurveyPreviewTitle from '../components/SurveyPreviewForm/Title';
import {formStateStorage} from '../store/localStorage';

const PreviewContainer = () => {
  const formData = formStateStorage.getItem();
  const {title, description} = formData;
  return (
    <>
      <SurveyPreviewTitle title={title} />
      <SurveyPreviewDescription description={description} />
    </>
  );
};

export default PreviewContainer;
