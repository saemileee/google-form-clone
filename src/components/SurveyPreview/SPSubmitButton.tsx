import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {submitForm, setInvalidQuestions} from '../../features/surveyPreviewSlice';
import {RootState} from '../../store/store';
import {color} from '../../styles/variables.ts/color';
import {getUnfilledRequiredIds} from '../../utils/formValidations';

const SPSubmitButton = () => {
  const questions = useSelector((state: RootState) => state.surveyPreview.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitFormData = () => {
    const invalidatedQuestionIds = getUnfilledRequiredIds(questions);
    const isValidatedForm = invalidatedQuestionIds.length === 0;
    if (isValidatedForm) {
      dispatch(submitForm());
      navigate('/result');
    } else {
      dispatch(setInvalidQuestions({invalidatedQuestionIds}));
    }
  };
  return (
    <FormSubmitButton aria-label='submit-form' name='submit-form' onClick={submitFormData}>
      Submit
    </FormSubmitButton>
  );
};

export default SPSubmitButton;

const FormSubmitButton = styled.button`
  padding: 12px 28px 12px 32px;
  background-color: ${color.primary};
  color: white;
  border-radius: 4px;
  font-size: 13pt;
`;
