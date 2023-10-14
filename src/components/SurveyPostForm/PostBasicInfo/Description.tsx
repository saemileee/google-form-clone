import {useDispatch, useSelector} from 'react-redux';
import {PLACEHOLDERS} from '../../../constants/Form';
import {changeDescription} from '../../../features/surveyPostSlice';
import {RootState} from '../../../store/store';
import {StyledTextInput} from '../../../styles/Form';
import {selectAllText} from '../../../utils/textInputControllers';
import useTempSave from '../../../hooks/useTempSave';

const Description = () => {
  const description = useSelector((state: RootState) => state.questionForm.description);
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeDescription({value}));
    saveTempForm();
  };

  return (
    <StyledTextInput
      type='text'
      aria-label='description'
      value={description}
      placeholder={PLACEHOLDERS.DESCRIPTION}
      onChange={onTextInputChange}
      onFocus={selectAllText}
    />
  );
};

export default Description;
