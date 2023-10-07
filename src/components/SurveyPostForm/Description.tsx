import {useDispatch, useSelector} from 'react-redux';
import {PLACEHOLDERS} from '../../constants/Form';
import {RootState} from '../../store/store';
import {changeDescription} from '../../features/questionFormSlice';
import {StyledTextInput} from '../../styles/Form';

const Description = () => {
  const description = useSelector((state: RootState) => state.questionForm.description);
  const dispatch = useDispatch();

  return (
    <StyledTextInput
      type='text'
      value={description}
      placeholder={PLACEHOLDERS.DESCRIPTION}
      onChange={e => {
        const value = e.target.value;
        dispatch(changeDescription({value}));
      }}
    />
  );
};

export default Description;
