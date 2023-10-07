import styled from 'styled-components';
import {color} from '../../styles/variables.ts/color';
import {getUnfilledRequiredIndexes} from '../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {submitFormData} from '../../features/surveyResultSlice';
import {useNavigate} from 'react-router-dom';

const SubmitButton = () => {
  const formData = useSelector((state: RootState) => state.surveyPreviewForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = () => {
    // 유효성 추가 필요
    dispatch(submitFormData({form: formData}));
    navigate('/result');
  };
  return <FormSubmitButton onClick={submitForm}>Submit</FormSubmitButton>;
};

export default SubmitButton;

const FormSubmitButton = styled.button`
  padding: 12px 28px 12px 32px;
  background-color: ${color.primary};
  color: white;
  border-radius: 4px;
  font-size: 13pt;
`;
