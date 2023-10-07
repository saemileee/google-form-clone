import {FormDescription} from '../../interface/Form';

const SurveyPreviewDescription = ({description}: {description: FormDescription}) => {
  return <p>{description}</p>;
};

export default SurveyPreviewDescription;
