import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../../../store/store';
import {color} from '../../../styles/variables.ts/color';
import {getUnfilledRequiredIndexes} from '../../../utils/formValidations';
import {setInvalidatedQuestions, submitForm} from '../../../features/surveyPreviewFormSlice';

const SubmitButton = () => {
  const questions = useSelector((state: RootState) => state.surveyPreviewForm.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitFormData = () => {
    const invalidatedQuestionIndexes = getUnfilledRequiredIndexes(questions);
    const isValidatedForm = invalidatedQuestionIndexes.length === 0;
    if (isValidatedForm) {
      dispatch(submitForm());
      navigate('/result');
    } else {
      dispatch(setInvalidatedQuestions({invalidatedQuestionIndexes}));
    }
  };
  return <FormSubmitButton onClick={submitFormData}>Submit</FormSubmitButton>;
};

export default SubmitButton;

const FormSubmitButton = styled.button`
  padding: 12px 28px 12px 32px;
  background-color: ${color.primary};
  color: white;
  border-radius: 4px;
  font-size: 13pt;
`;
