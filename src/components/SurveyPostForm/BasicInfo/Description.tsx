import {useDispatch, useSelector} from 'react-redux';
import {PLACEHOLDERS} from '../../../constants/Form';
import {changeDescription} from '../../../features/questionFormSlice';
import {RootState} from '../../../store/store';
import {StyledTextInput} from '../../../styles/Form';

const Description = () => {
  const description = useSelector((state: RootState) => state.questionForm.description);
  const dispatch = useDispatch();

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeDescription({value}));
  };

  return (
    <StyledTextInput
      type='text'
      value={description}
      placeholder={PLACEHOLDERS.DESCRIPTION}
      onChange={onTextInputChange}
    />
  );
};

export default Description;
