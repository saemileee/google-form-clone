import {useDispatch, useSelector} from 'react-redux';
import {PLACEHOLDERS} from '../../constants/Form';
import useTempSave from '../../hooks/useTempSave';
import {RootState} from '../../store/store';
import {StyledTextInput} from '../../styles/Form';
import {selectAllText} from '../../utils/textInputControllers';
import {changeDescription} from '../../features/surveyBuilderSlice';

const SBBasicInfoDescription = () => {
  const description = useSelector((state: RootState) => state.surveyBuilder.description);
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

export default SBBasicInfoDescription;
