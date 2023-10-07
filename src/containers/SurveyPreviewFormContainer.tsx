import {formStateStorage} from '../store/localStorage';

const PreviewContainer = () => {
  const formData = formStateStorage.getItem();
  const {title, description} = formData;
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export default PreviewContainer;
