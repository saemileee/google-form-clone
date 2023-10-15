import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useTempSave from '../../hooks/useTempSave';
import {RootState} from '../../store/store';
import {StyledTitleInput} from '../../styles/Form';
import {selectAllText} from '../../utils/textInputControllers';
import {changeTitle} from '../../features/surveyBuilderSlice';

const SBBasicInfoTitle = () => {
  const title = useSelector((state: RootState) => state.surveyBuilder.title);
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();

  const typeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeTitle({value}));
    saveTempForm();
  };

  return (
    <StyledTitleInput
      aria-label='title'
      onFocus={selectAllText}
      type='text'
      value={title}
      onChange={typeTitle}
    />
  );
};

export default SBBasicInfoTitle;
